'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loopLoading, setLoopLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('silent_media_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

const handleDownload = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!url || loading) return; 

  setLoading(true);
  setError('');
  setResult(null);
  setCurrentImgIndex(0);
  setCopied(false);

  try {
    const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    if (json && json.data) {
      setResult(json.data);

      const newItem = {
        title: json.data.title || 'គ្មានចំណងជើង',
        cover: json.data.cover,
        url: url,
        timestamp: Date.now()
      };
      
      const currentHistory = history || [];
      const updatedHistory = [newItem, ...currentHistory.filter(h => h.url !== url)].slice(0, 3);
      setHistory(updatedHistory);
      localStorage.setItem('silent_media_history', JSON.stringify(updatedHistory));

    } else {
      setError('រកមិនឃើញទិន្នន័យទេ! សូមពិនិត្យមើល Link TikTok របស់អ្នកឡើងវិញ។');
    }
  } catch (err) {
    console.error(err);
    setError('មានបញ្ហាបច្ចេកទេសក្នុងការភ្ជាប់ទៅកាន់ Server!');
  } finally {
    setLoading(false); 
  }
};

  const downloadAllImagesDirectly = async () => {
    if (!result || !result.images) return;
    setLoopLoading(true);

    try {
      for (let i = 0; i < result.images.length; i++) {
        const imgUrl = result.images[i];
        const downloadUrl = `/api/download?url=${encodeURIComponent(imgUrl)}&type=image&index=${i + 1}`;
        
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `silent_media_image_${i + 1}.jpg`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);

        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    } catch (err) {
      alert('មានបញ្ហាក្នុងការទាញយករូបភាពទាំងអស់! សូមសាកល្បងម្ដងទៀតមេ។');
    } finally {
      setLoopLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // 💡 ថែម overflow-x-hidden និង w-full នៅទីនេះការពារការលានអេក្រង់
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 antialiased font-sans relative overflow-x-hidden w-full">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-20%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <nav className="bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800/80 px-4 py-4 w-full">
        <div className="max-w-md mx-auto flex justify-between items-center w-full">
          <div className="text-xl font-black tracking-widest bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent [font-family:var(--font-dangrek)]">
            🚀 SILENT MEDIA
          </div>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Mobile v6.0
          </span>
        </div>
      </nav>

      {/* Main Container */}
      {/* 💡 ថែម max-w-[100vw] និង overflow-x-hidden នៅទីនេះ */}
      <main className="flex-grow flex flex-col items-center px-4 py-8 max-w-md mx-auto w-full max-w-[100vw] space-y-8 relative z-10 overflow-x-hidden">
        
        {/* Intro Section */}
        <div className="text-center space-y-3 pt-4 w-full">
          <h1 className="text-3xl md:text-4xl text-white leading-tight tracking-wide [font-family:var(--font-dangrek)]">
            ទាញយកវីដេអូ & រូបភាព <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">គ្មាន Watermark ឡើយ</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium px-4">
            ដោនឡូតល្បឿនលឿន ងាយស្រួលបំផុត រូបភាពរត់ចូល Gallery ទូរស័ព្ទភ្លាមៗ!
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleDownload} className="w-full space-y-3">
          <div className="bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col gap-2 focus-within:border-indigo-500/50 transition-all w-full overflow-hidden">
            <input 
  type="url" 
  placeholder="បិទ Link វីដេអូ ឬរូបភាព TikTok នៅទីនេះ..." 
  required
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  onFocus={(e) => e.target.select()} 
  className="w-full px-4 py-4 text-sm rounded-xl bg-slate-950 border border-slate-800/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
/>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 active:scale-[0.99] disabled:from-slate-700 disabled:to-slate-700 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {loading ? 'កំពុងវិភាគទិន្នន័យ...' : 'ចាប់ផ្ដើមទាញយក'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          // 💡 ថែម break-words នៅទីនេះដើម្បីកុំឱ្យអក្សររុញប្រអប់ធំជាងអេក្រង់
          <div className="w-full max-w-full overflow-hidden p-4 bg-red-950/50 rounded-xl border border-red-100/10 text-red-400 text-xs font-medium text-center backdrop-blur-md break-words">
            {error}
          </div>
        )}

        {/* Result Showcase */}
        {result && (
          <div className="w-full max-w-full overflow-hidden bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-slate-800/80 space-y-5 transition-all">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-sm font-bold text-slate-200">ប្រព័ន្ធរៀបចំរួចរាល់ហើយ!</h2>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(result.images ? result.images[currentImgIndex] : result.play)}
                className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg hover:bg-indigo-500/20 transition-all whitespace-nowrap ml-2"
              >
                {copied ? '✅ បានចម្លង!' : '🔗 ចម្លង Link ស្អាត'}
              </button>
            </div>

            {/* 📸 ប្រភេទរូបភាព Slideshow */}
            {result.images && result.images.length > 0 ? (
              <div className="space-y-4">
                
                {/* ប៊ូតុងទំនើប៖ ដោនឡូតគ្រប់រូបភាពព្រមគ្នា */}
                <button 
                  type="button"
                  onClick={downloadAllImagesDirectly}
                  disabled={loopLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-white font-bold py-4 rounded-xl text-xs transition shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 px-2 text-center"
                >
                  {loopLoading ? (
                    <span className="flex items-center gap-2 animate-pulse">⚡ កំពុងទាញយករូបភាពទាំងអស់...</span>
                  ) : (
                    `📥 ទាញយករូបភាពទាំង ${result.images.length} សន្លឹកចូល Gallery ព្រមគ្នា`
                  )}
                </button>

                <div className="relative bg-slate-950 border border-slate-800 p-2 rounded-xl flex items-center justify-center overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => setCurrentImgIndex((p) => (p === 0 ? result.images.length - 1 : p - 1))}
                    className="absolute left-3 z-10 p-2.5 rounded-full bg-slate-900/90 border border-slate-800 text-white transition active:scale-90 select-none"
                  >
                    ❮
                  </button>

                  <div className="w-full rounded-lg overflow-hidden bg-slate-900 aspect-square flex flex-col justify-center items-center">
                    <img src={result.images[currentImgIndex]} alt="Slide" className="w-full h-full object-contain" />
                  </div>

                  <button 
                    type="button"
                    onClick={() => setCurrentImgIndex((p) => (p === result.images.length - 1 ? 0 : p + 1))}
                    className="absolute right-3 z-10 p-2.5 rounded-full bg-slate-900/90 border border-slate-800 text-white transition active:scale-90 select-none"
                  >
                    ❯
                  </button>
                </div>

                <div className="text-center text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 py-1.5 px-4 rounded-full w-max mx-auto">
                  {currentImgIndex + 1} / {result.images.length}
                </div>

                <a 
                  href={`/api/download?url=${encodeURIComponent(result.images[currentImgIndex])}&type=image&index=${currentImgIndex + 1}`}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-center font-semibold py-3.5 rounded-xl border border-slate-700 transition text-xs flex items-center justify-center gap-2 px-2"
                >
                  📥 សេវតែរូបមួយសន្លឹកនេះ (Save Current Image)
                </a>
              </div>
            ) : (
              // 🎥 ប្រភេទវីដេអូ
              <div className="space-y-4">
                <div className="w-full rounded-xl overflow-hidden bg-slate-950 aspect-[9/16] max-h-[380px] border border-slate-800 flex justify-center items-center">
                  <video src={result.play} controls poster={result.cover} className="w-full h-full object-contain" playsInline />
                </div>
                <a 
                  href={`/api/download?url=${encodeURIComponent(result.play)}&type=video`}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center font-bold py-4 rounded-xl transition shadow-md text-xs flex items-center justify-center gap-2 px-2"
                >
                  📥 ចុចទីនេះដើម្បីទាញយកវីដេអូ
                </a>
              </div>
            )}

            {/* Title */}
            <p className="text-slate-400 text-xs font-medium line-clamp-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-left break-words">
              {result.title || 'គ្មានចំណងជើង (No Title)'}
            </p>

            {/* Sound MP3 */}
            {result.music_info && (
              <a 
                href={result.music_info.play} 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-400 text-center font-semibold py-3.5 rounded-xl border border-slate-800 transition text-xs flex items-center justify-center gap-2 px-2"
              >
                🎵 ទាញយកតែបទភ្លេង/សំឡេង MP3
              </a>
            )}
          </div>
        )}

        {/* Recent History */}
        {history.length > 0 && (
          <div className="w-full space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-left pl-1">
              ⌛ ឯកសារទើបដោនឡូតថ្មីៗ (Recent)
            </h3>
            <div className="grid grid-cols-1 gap-2 w-full">
              {history.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setUrl(item.url); }}
                  className="w-full bg-slate-900/60 backdrop-blur-md p-2.5 rounded-xl border border-slate-800/60 shadow-md flex items-center gap-3 hover:border-indigo-500 transition-all text-left overflow-hidden"
                >
                  <img src={item.cover} className="w-10 h-10 object-cover rounded-lg bg-slate-950 shrink-0 border border-slate-800" alt="History" />
                  <div className="truncate pr-2 w-full overflow-hidden">
                    <p className="text-xs font-semibold text-slate-200 truncate w-full">{item.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate w-full">ចុចដើម្បីបញ្ចូល Link ដោនឡូតឡើងវិញ</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ads Placeholder */}
       {/* 💰 ផ្ទាំងពាណិជ្ជកម្ម Google AdSense ផ្លូវការ */}
        <div className="w-full max-w-full overflow-hidden p-2 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-center relative min-h-[100px] flex items-center justify-center mt-6">
          <div className="absolute top-2 left-0 right-0 text-[10px] font-bold text-slate-600 tracking-wider uppercase z-0">Sponsor Advertisement</div>
          
          <div className="relative z-10 w-full mt-4 overflow-hidden">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-9969263791405305"
                 data-ad-slot="auto" 
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script
               dangerouslySetInnerHTML={{
                 __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
               }}
            />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-slate-900 bg-slate-950/80 w-full relative z-10">
        <p className="text-[11px] text-slate-500 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} <span className="font-bold text-slate-400">SILENT MEDIA</span>. រក្សាសិទ្ធិគ្រប់យ៉ាងដោយមហាសេដ្ឋីលាក់មុខ។
        </p>
      </footer>

    </div>
  );
}