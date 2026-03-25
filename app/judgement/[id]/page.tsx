"use client";

import { useRouter, useParams } from "next/navigation";

export default function AnalysisPage(){
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    return (
        <div>
            <h1>Analysis Page for {id}</h1>
            <button onClick={() => router.push("/")}>Go Back</button>
        </div>
    );
}