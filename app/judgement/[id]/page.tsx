"use client";

import { useRouter, useParams } from "next/navigation";

export default function AnalysisPage({ params }: { params: Promise<{ id: string }> }){
    const router = useRouter();

    return (
        <div>
            <h1>Analysis Page</h1>
            <button onClick={() => router.push("/")}>Go Back</button>
        </div>
    );
}