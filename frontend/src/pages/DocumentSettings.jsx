import React, { useState, useEffect } from 'react';
import { FileUp, FileText, CheckCircle2, AlertCircle, Loader2, Download, Trash2 } from 'lucide-react';
import { settingsAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentSettings = () => {
    const [checklistData, setChecklistData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchChecklist();
    }, []);

    const fetchChecklist = async () => {
        try {
            const res = await settingsAPI.getChecklist();
            setChecklistData(res.data);
        } catch (error) {
            console.error('Error fetching checklist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete the current checklist? This cannot be undone.')) return;

        setDeleting(true);
        setMessage({ type: '', text: '' });
        try {
            await settingsAPI.deleteChecklist();
            setMessage({ type: 'success', text: 'Checklist deleted successfully!' });
            setChecklistData({ checklistPdfPath: '', checklistPdfOriginalName: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete checklist.' });
            console.error('Delete error:', error);
        } finally {
            setDeleting(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setMessage({ type: '', text: '' });
        } else {
            setFile(null);
            setMessage({ type: 'error', text: 'Please select a valid PDF file.' });
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('checklist', file);

        try {
            await settingsAPI.uploadChecklist(formData);
            setMessage({ type: 'success', text: 'Checklist PDF uploaded successfully!' });
            setFile(null);
            fetchChecklist();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to upload PDF. Please try again.' });
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-[#1a6b8c] to-[#0d3b4d] rounded-[2rem] p-10 text-white shadow-xl shadow-[#1a6b8c]/20 overflow-hidden relative group">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <FileUp size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Document Management</h1>
                        <p className="text-white/70 text-lg max-w-xl">
                            Upload and manage the checklist PDF. This document will be automatically attached to confirmation emails after a successful payment.
                        </p>
                    </div>
                </div>
            </div>

            {/* Current Document View */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <FileText size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Current Checklist</h2>
                    </div>
                    {checklistData?.checklistPdfPath && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                                <CheckCircle2 size={12} /> Active
                            </span>
                        </div>
                    )}
                </div>

                {checklistData?.checklistPdfPath ? (
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200 gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200">
                                <FileText className="text-red-500" size={28} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-lg truncate max-w-[200px] md:max-w-md">
                                    {checklistData.checklistPdfOriginalName}
                                </p>
                                <p className="text-xs text-slate-400 font-medium">
                                    Last Updated: {new Date(checklistData.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all border border-red-100 disabled:opacity-50"
                        >
                            {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                            Delete
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 text-slate-400">
                            <FileText size={24} />
                        </div>
                        <p className="text-slate-500 font-medium italic">No checklist PDF has been uploaded yet.</p>
                    </div>
                )}
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <FileUp size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Upload New Checklist</h2>
                </div>

                <div className="space-y-6">
                    <div className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
                        file ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300 bg-[#F8FAFC]'
                    }`}>
                        <input 
                            type="file" 
                            onChange={handleFileChange}
                            accept="application/pdf"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-4">
                            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all ${
                                file ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-slate-400 border border-slate-200'
                            }`}>
                                <FileUp size={28} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-lg">
                                    {file ? file.name : 'Choose a new PDF checklist'}
                                </p>
                                <p className="text-sm text-slate-400 font-medium">Click to browse or drag and drop your file here</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Max file size: 10MB</p>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {message.text && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`p-4 rounded-xl flex items-center gap-3 border ${
                                    message.type === 'success' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'
                                }`}
                            >
                                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                <span className="text-sm font-bold">{message.text}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                            !file || uploading 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                                : 'bg-primary text-white hover:bg-primary-dark shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                Uploading Document...
                            </>
                        ) : (
                            <>
                                <FileUp size={20} />
                                Start Upload
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentSettings;
