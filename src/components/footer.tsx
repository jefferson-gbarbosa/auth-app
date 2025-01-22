export function Footer() {
    return (
        <footer className="w-full bg-gray-800 py-4">
            <div className="container mx-auto px-4"> 
                <p className="text-white text-base md:text-lg text-center">
                    &copy; {new Date().getFullYear()} Jefferson Gonçalves 
                </p>
            </div>
        </footer>
    );
}