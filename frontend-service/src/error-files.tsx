import icon from "./assets/icon.png"

export default function Index(): React.ReactNode{
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white text-gray-800">
            <img
                src={icon}
                alt="icon"
                className="w-16 h-16 mb-6 md:w-40 md:h-40"
            />      
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">404</h1>        
            <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                Hmm... halaman ini tidak ditemukan. 🚧<br />
                Tapi jangan khawatir, kamu masih bisa kembali.
            </p>        
            <a
                href="/"
                className="inline-block px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:border-gray-900 transition-colors"
            >
                Kembali ke Beranda
            </a>
    </div>
    )
}