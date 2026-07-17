import { SiInstagram } from '@icons-pack/react-simple-icons'

export default function Footer(){
    return (
        <footer className="px-8 py-6 mt-16"style={{ background: '#1C1915', color: '#D5CBB6' }}>
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                <span
                    style={{
                    fontFamily: '"Fraunces", serif',
                    fontWeight: 400,
                    fontSize: '1.1rem',
                    color: '#FAF6ED',
                    }}
                >
                    Wild Wool Wales
                </span>
                <span
                    className="text-xs"
                    style={{
                    color: '#7A6F5C',
                    fontFamily: '"Newsreader", serif',
                    fontStyle: 'italic',
                    }}
                >
                    © Made with care, in SaundersFoot
                </span>
                </div>
                <div className="flex items-center gap-6">
                <a
                    href="https://www.instagram.com/wildwoolwales/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs transition-colors"
                    style={{ color: '#D5CBB6', fontFamily: '"Newsreader", serif' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF6ED')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#D5CBB6')}
                >
                    <SiInstagram size={14} color="#FF0069" /> @wildwoolwales.uk
                </a>
                <a
                    href="mailto:hello@wildwoolwales.uk"
                    className="text-xs transition-colors"
                    style={{ color: '#D5CBB6', fontFamily: '"Newsreader", serif' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF6ED')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#D5CBB6')}
                >
                    ✉ hello@wildwoolwales.uk
                </a>
                </div>
            </div>
        </footer>

           
  );

}