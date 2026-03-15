"use client"
import { useRef, useState } from 'react';
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useInterview } from '@/hooks/useInterview';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/PageComponent/Navbar';

export default function Home() {
  // form state hooks
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState('');
  const resumeInputRef = useRef()
  const router = useRouter()
  const { loading, generateReport, reports} = useInterview()

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };


  // console.log("Reports on home : ", reports.data[0]._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const resumeFile = resumeInputRef.current.files[0]

    const response = await generateReport({ jobDescription, selfDescription, resume: resumeFile})
    console.log(response.data);
    if(response?.data?._id){
      router.push(`/interview/${response.data._id}`)
    }
  };

  const formatDate = (dateString) => {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)

  return `${day}/${month}/${year}`
}

const handleClick = (id) => {
  router.push(`/interview/${id}`)
}
   return (
   <>
    <Navbar />
    <main className="h-screen w-full flex flex-col justify-center items-center m-3 p-5 gap-15">
        <form onSubmit={handleSubmit} className="bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-600/50  flex flex-col md:flex-row gap-[2vw] p-4 rounded-2xl h-[80vh] md:h-[70vh] max-w-[80vw] md:max-w-[50vw] w-full">
          <div className="self-stretch flex flex-col flex-1 shrink-0 w-full h-full min-w-[300px]">
             <Label htmlFor="jobDescription" className={"mt-3 mb-1.5 pl-1"}>Job Description</Label>
            <Textarea
            id="jobDescription"
            name="jobDescription"
            value={jobDescription}
            onChange={(e) => {setJobDescription(e.target.value)}}
            placeholder={"Enter job description here...."}
            className="border-zinc-200 border-r-green-400 border-r-4 shadow-md shadow-green-300/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none flex-1 w-full font-mono resize-none"
/>
            <ModeToggle />
        </div>
        <div className="min-w-sm flex-1 self-stretch shrink-0 w-full h-full">
            <div className="min-w-0 flex flex-col h-full">
                {/* resume upload box mimic image style */}
                <div className="mb-4">
                    <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-md appearance-none cursor-pointer hover:border-green-400 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16v-4a4 4 0 014-4h6" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v9m0 0l-3-3m3 3l3-3" />
                        </svg>
                        <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{resumeFile ? resumeFile.name : 'Drop your PDF/Word here (max 3MB)'}</span>
                    </label>
                    <Input 
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf"
                        className={"hidden"}
                        ref={resumeInputRef}
                        onChange={handleResumeChange}
                    />
                </div>

                <Label htmlFor="selfDescription" className={"mt-3 mb-1.5 pl-1"}>Quick self-description</Label>
                <Textarea 
                    id="selfDescription"
                    name="selfDescription"
                    value={selfDescription}
                    onChange={(e) => {setSelfDescription(e.target.value)}}
                    placeholder="Highlight achievements or focus areas..."
                    required
                    className={"border-zinc-200  border-r-green-400 border-r-4 shadow-md shadow-green-300/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none h-full"}
                />

                <Button
                        variant="outline"
                        size='lg'
                        disabled={loading}
                        type="submit"
                        className={"bg-zinc-800 text-zinc-100  dark:hover:bg-green-500  hover:bg-green-500 hover:cursor-pointer font-bold border-green-400 dark:border-green-400 transition-all duration-500 ease-in-out w-full mt-4" }
                        >
                        {loading ? <>Generating <Spinner /></> : <>Generate</>}
                </Button>
            </div>
        </div>
        </form>

        <div className='w-[80vw] p-4'>
          <div className={"text-xl font-bold p-2 mb-3 inline-block"}>My Recent Interview Plan</div>
          <div className='flex gap-3'>
            {reports?.data?.length ? (
              reports.data.map((report) => (
          <Card key={report._id} className={"cursor-pointer"} onClick={() => handleClick(report._id)}>
            <CardHeader>
              <CardTitle className={"hover:text-green-500 hover:underline"}>{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm font-medium'>Generated at : {formatDate(report.createdAt)}</div>
              <div className='text-sm font-medium text-red-500 mt-1'>Match Score : {report.matchScore}</div>  
            </CardContent>
          </Card>
          ))
           ) : ( <p>No report found</p>)}
          </div>
        </div>
    </main>
    </>
  )

}
