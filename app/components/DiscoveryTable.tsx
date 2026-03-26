"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Search, Filter } from 'lucide-react';
import { Judgment } from '../types/database';
import { useRouter } from 'next/navigation';


export default function DiscoveryTable({ data, totalCount, currentPage }: { data: Judgment[], totalCount: number, currentPage: number }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const totalPages = Math.ceil(totalCount / 20);

    const goToPage = (page: number) => {
        router.push(`/?page=${page}`);
    };

    const toggleRow = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };
    return(
        <div className="w-full bg-white">
            {/* Search & Filter Bar - Border Only, No Shadows */}
            <div className="flex items-center gap-2 p-3 border-b border-slate-200">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400"/>
                    <input
                        type="text"
                        placeholder="Search judgments..."
                        className="w-full bg-transparent pl-8 pr-3 py-1.5 text-xs border border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-200 hover:bg-slate-50">
                    <Filter className="h-3 w-3" />
                    Filter
                </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 bg-slate-50/50 border-b border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <div className="col-span-6 md:col-span-5">Judgment Name</div>
                <div className="hidden md:block col-span-2">Court</div>
                <div className="col-span-3 md:col-span-2">Category</div>
                <div className="col-span-2 md:col-span-2 text-right">Date / Views</div>
                <div className="col-span-1"></div>
            </div>
            {/* Table Body */}
            <div className="divide-y divide-slate-100">
                {data && data.length > 0 ? data.filter(item => item).map((item)=>(
                    <div key={item.id} className='group'>
                        {/* Main Row */}
                        <div onClick={() => toggleRow(item.id)}
                            className="grid grid-cols-12 px-4 py-3 items-center hover:bg-slate-50 cursor-pointer transition-colors">
                            <div className="col-span-6 md:col-span-5 pr-4">
                                <span className="text-sm font-bold text-slate-900 block text-wrap">
                                {item.case_name || 'Untitled'}
                                </span>
                                <span className="md:hidden text-[10px] text-slate-400 mt-0.5 block">
                                {item.court_name || 'Unknown Court'}
                                </span>
                            </div>
                            <div className="hidden md:block col-span-2 text-xs text-slate-600">
                                {item.court_name || 'Unknown Court'}
                            </div>
                            <div className="col-span-3 md:col-span-2">
                                {item?.tags?.level_1 ? <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 md:text-[10px] text-[8px] font-bold border border-emerald-100 uppercase tracking-tighter">
                                {item.tags.level_1}
                                </span> : <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200 uppercase tracking-tighter">
                                No Category
                                </span>}
                            </div>
                            <div className="col-span-2 md:col-span-2 text-right space-y-0.5">
                                <div className="text-xs text-slate-900 font-mono">
                                {item?.judgement_date ? new Date(item.judgement_date).toLocaleDateString('en-ZA') : 'N/A'}
                                </div>
                                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400">
                                <Eye className="h-2.5 w-2.5" />
                                {item?.view_count ? item.view_count.toLocaleString() : '0'}
                                </div>
                            </div>
                            <div className="col-span-1 flex justify-end">
                                {expandedId === item.id ? (
                                <ChevronUp className="h-4 w-4 text-slate-400" />
                                ) : (
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                                )}
                            </div>
                        </div>
                        {/* Expandable Facts Section */}
                            {expandedId === item.id && (
                            <div className="bg-slate-50/30 px-4 py-4 border-b border-slate-200 border-l-2 border-l-emerald-500 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="max-w-3xl">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Summary of Facts</h4>
                                <p className="text-xs leading-relaxed text-slate-700 line-clamp-4">
                                    {item.sections.facts || "No summary available for this judgment."}
                                </p>
                                <div className="mt-4 flex gap-3">
                                    <a 
                                    href={`/judgement/${item.id}`}
                                    className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-tight underline underline-offset-4"
                                    >
                                    View Full Judgment →
                                    </a>
                                </div>
                                </div>
                            </div>
                            )}
                    </div>
                )) : (
                    <div className="px-4 py-8 text-center text-slate-500">
                        <p>No judgments found.</p>
                    </div>
                )}
            </div>
            {/* Pagination UI */}
            <div className="flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50">
                <span className="text-xs text-slate-500">
                Showing Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                <button 
                    disabled={currentPage <= 1}
                    onClick={() => goToPage(currentPage - 1)}
                    className="px-3 py-1 text-xs border border-slate-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <button 
                    disabled={currentPage >= totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-3 py-1 text-xs border border-slate-300 disabled:opacity-50"
                >
                    Next
                </button>
                </div>
            </div>
        </div>
    )
}