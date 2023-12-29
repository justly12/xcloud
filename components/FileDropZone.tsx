'use client'
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AlertCircle, AlertCircleIcon, UploadCloudIcon, UploadIcon } from "lucide-react";
import Dropzone from "react-dropzone"
import { useUser } from "@clerk/nextjs"
import {addDoc,updateDoc,doc,collection,serverTimestamp} from "firebase/firestore"
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import toast, { Toaster } from 'react-hot-toast';



function FileDropZone() {

    const [loading ,setLoading] = useState(false);
    const {isLoaded, isSignedIn, user } = useUser();

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader =new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");

            reader.onload = async() => {
                await uploadPost(file);
            };

            reader.readAsArrayBuffer(file);
        });

    };

    const uploadPost = async (selectedFile:File) => {

        if(loading) return;
        if(!user) return;

        setLoading(true);

         const toastId = toast.loading("Uploading...");

        //loading actions
        const docRef = await addDoc(collection(db,"users",user.id,"files"),{
            userId: user.id,
            filename: selectedFile.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timestamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size,

        });

        const imageRef =ref(storage, `users/${user.id}/files/${docRef.id}`);

        uploadBytes(imageRef, selectedFile).then(async(snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "users", user.id,"files",docRef.id),{

                downloadURL:downloadURL,
            });
        });

        toast.success("File Uploaded Successfully",{
          id: toastId,
        });
        setLoading(false);

    } ;
    
    const maxSize = 20971520;

   

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
     {({getRootProps, 
       getInputProps
       ,isDragActive,
       isDragReject,
       fileRejections, }) => {
            
        const isFileTooLarge = 
        fileRejections.length > 0 && fileRejections[0].file.size >maxSize;

        return (
        <section className="m-5">
        <div {...getRootProps()}
         className={cn("w-full flex justify-center items-center p-5  border border-dashed rounded-lg text-center",
         isDragActive ? "bg-[#035FFE] text-white animate-pulse" :  "bg-slate-100/50:bg-slate-800/80"
         
         
         )}>
            <input {...getInputProps()} />

            {!isDragActive && (
                <div className="flex items-center space-x-2"> 
                    <UploadIcon />
                    <p>Click here or drop a file to upload </p>
                </div>
            )}
            {isDragActive && !isDragReject && (
                <div className="flex items-center space-x-2">
                    <UploadCloudIcon/>
                    <p>Drop to upload this file</p>
                </div>
            )}

            {isDragReject &&
            (
                <div className="flex items-center space-x-2">
                   <AlertCircleIcon />
                    <p>File type not accepted, sorry</p>
                </div>
            )}
            {isFileTooLarge && (
                <div className="flex items-center space-x-2">
                    <AlertCircleIcon />
                    <p>File is too large.</p>
                    </div>
            )}


        </div>
        </section>
    )}}
    </Dropzone>
  )
}

export default FileDropZone
