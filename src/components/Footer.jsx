
import { Github } from 'lucide-react'; // or use react-icons if preferred

export default function Footer() {
    return (
        <footer className="mt-12 py-6 border-t border-silver-500 text-center text-silver-500 text-sm md:text-base px-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                <p>
                    🛠️ Built by <span className="font-semibold text-white">Siddharth > </span>
                </p>
                <a
                    href="https://github.com/isid555/TinyUrl-Client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition"
                >
                    <Github size={24} />
                    View on GitHub
                </a>
            </div>
        </footer>
    );
}
