"use client";

import { useRouter, useParams } from "next/navigation";
import { use } from "react";

export default function AnalysisPage({ params }: { params: Promise<{ id: string }> }){
    const router = useRouter();
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    return (
        <div>
            <h1>Analysis Page for {id}</h1>
            <button onClick={() => router.push("/")}>Go Back</button>
        </div>
    );
}