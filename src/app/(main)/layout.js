import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import 'react-loading-skeleton/dist/skeleton.css'
export default function HomeLayout({ children }) {
    return (
        <>
            <Navigation />
            <div>{children}</div>
            <Footer />
        </>
    );
}