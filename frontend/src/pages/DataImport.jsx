import React, { useState } from 'react';
import { 
  FileUp, 
  FileSpreadsheet, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw,
  Plus,
  Table as TableIcon,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { importAPI } from '../services/api';

const DataImport = () => {
  const { fetchClients } = useData();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const handleDownloadTemplate = async () => {
    try {
      const response = await importAPI.downloadTemplate();
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Loan_Import_Template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading template:', error);
      alert('Failed to download template. Please try again.');
    }
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        // Simulate upload delay for UI
        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          setStep(2);
        }, 1500);
      }
    };
    input.click();
  };

  const confirmImport = async () => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await importAPI.uploadExcel(formData);

      setImportResult(response.data);
      setStep(3);
      fetchClients(); // Refresh global data
    } catch (error) {
      console.error('Import failed:', error);
      alert(error.response?.data?.message || 'Import failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">
            <FileUp size={16} />
            Migration Suite
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Data Import</h1>
          <p className="text-slate-500 mt-2 font-medium">Migrate your legacy Excel loan tracking data to the automated centralized system.</p>
        </div>
        <button 
          onClick={handleDownloadTemplate}
          className="bg-indigo-50 border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 px-6 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center gap-3 transition-all shadow-sm shadow-indigo-100 group"
        >
          <Download size={18} className="group-hover:scale-110 transition-transform" />
          Download Sample Template
        </button>
      </div>

      <div className="flex gap-4">
         {[1, 2, 3].map(s => (
           <div key={s} className="flex-1 flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
               step === s ? 'bg-primary text-white shadow-lg shadow-primary/20' : 
               step > s ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
             }`}>
               {step > s ? <CheckCircle2 size={20} /> : s}
             </div>
             <div>
               <p className={`text-[10px] font-black uppercase tracking-widest ${
                 step === s ? 'text-primary' : 'text-slate-400'
               }`}>Step {s}</p>
               <p className="font-black text-slate-800 tracking-tight whitespace-nowrap">
                 {s === 1 ? 'Upload Excel' : s === 2 ? 'Confirm File' : 'Import Status'}
               </p>
             </div>
           </div>
         ))}
      </div>

      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3.5rem] p-20 shadow-2xl border-4 border-dashed border-slate-100 flex flex-col items-center text-center space-y-8"
        >
          <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-400 group hover:bg-primary/5 transition-all">
            <FileSpreadsheet size={64} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Drag and drop your spreadsheet</h3>
            <p className="text-slate-500 font-medium">Supports .xlsx and .xls formats</p>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={handleFileSelect}
               disabled={isUploading}
               className="bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest flex items-center gap-4 transition-all shadow-2xl shadow-primary/30 active:scale-95"
             >
               {isUploading ? <RefreshCcw className="animate-spin" /> : <Plus />}
               {isUploading ? 'UPLOADING...' : 'SELECT FILE'}
             </button>
          </div>
          <div className="pt-10 flex gap-8">
             <div className="flex items-center gap-3 text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-6 py-3 rounded-2xl">
                <CheckCircle2 size={18} />
                Strict Column Matching
             </div>
             <div className="flex items-center gap-3 text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-6 py-3 rounded-2xl">
                <CheckCircle2 size={18} />
                256-bit Secure Transit
             </div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-slate-50"
        >
           <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Ready to Import</h3>
           <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm">
                 <FileSpreadsheet size={32} />
              </div>
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Selected File</p>
                 <p className="font-black text-slate-800 text-xl">{file?.name}</p>
                 <p className="text-sm text-slate-500">{(file?.size / 1024).toFixed(2)} KB</p>
              </div>
           </div>
           
           <div className="mt-12 flex justify-end gap-6">
              <button 
                onClick={() => { setStep(1); setFile(null); }}
                className="px-10 py-5 bg-white border-2 border-slate-100 rounded-2xl font-black text-sm text-slate-500 tracking-widest hover:border-primary transition-all"
              >
                CANCEL
              </button>
              <button 
                onClick={confirmImport}
                disabled={isUploading}
                className="bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-primary/30 active:scale-95 flex items-center gap-3"
              >
                {isUploading ? <RefreshCcw className="animate-spin" /> : <CheckCircle2 />}
                {isUploading ? 'IMPORTING...' : 'START IMPORT'}
              </button>
           </div>
        </motion.div>
      )}

      {step === 3 && importResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3.5rem] p-20 shadow-2xl border border-primary/20 text-center"
        >
           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 size={48} />
           </div>
           <h3 className="text-3xl font-black text-slate-800 tracking-tight">Import Completed</h3>
           <p className="text-slate-500 font-medium max-w-lg mx-auto mt-4 mb-10 leading-relaxed">
             {importResult.message}
           </p>
           
           <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-12">
              <div className="p-6 bg-emerald-50 rounded-3xl">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Success</p>
                 <p className="text-4xl font-black text-emerald-600">{importResult.imported}</p>
              </div>
              <div className="p-6 bg-red-50 rounded-3xl">
                 <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Errors</p>
                 <p className="text-4xl font-black text-red-600">{importResult.errors ? importResult.errors.length : 0}</p>
              </div>
           </div>

           {importResult.errors && importResult.errors.length > 0 && (
               <div className="bg-red-50 p-6 rounded-3xl mb-10 text-left max-h-60 overflow-y-auto custom-scrollbar">
                   <h4 className="font-bold text-red-700 mb-2">Error Log:</h4>
                   <ul className="space-y-1 text-sm text-red-600">
                       {importResult.errors.map((err, i) => (
                           <li key={i}>• Row {err.row}: {err.message}</li>
                       ))}
                   </ul>
               </div>
           )}
           
           <button 
             onClick={() => { setStep(1); setFile(null); setImportResult(null); }}
             className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-16 py-6 rounded-[2rem] font-black text-lg tracking-widest transition-all"
           >
             IMPORT MORE
           </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DataImport;
