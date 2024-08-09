import Image from "next/image";
import Link from "next/link";

const HomeC2 = () => {
    return (
        <section>
            <div className="flex justify-between items-center max-w-screen-xl mx-auto pt-30 sm:pt-25 md:pt-20 lg:pt-16 px-4 lg:py-16 lg:px-6">
                <div className="space-y-6">
                    <p className="text-3xl font-bold tracking-tight leading-[1.208] sm:text-[40px] xl:text-5xl"> We Create <br /> Amazing Custom Staffs</p>
                    <p className="max-w-150 text-base">
                        At Coderhub, we specialize in crafting one-of-a-kind staffs that reflect
                        your unique personality, style, and needs.Whether you havea clear idea in
                        mind or need guidance, our team is here to help.Contact us to discuss your
                        project and let's create something!</p>
                    <button type="button" className="text-base px-6 py-3 lg:px-7 bg-sky-600 hover:bg-transparent hover:text-sky-800 border border-graydark rounded-lg hover:border-primary"> About </button>
                    <div>
                        <p className="font-normal text-md text-base">Some of your client</p>
                        <div className="flex items-center">
                            <Image src={"/images/client1.webp"} height={150} width={150} alt="oracle" />
                            <Image src={"/images/client2.webp"} height={150} width={150} alt="intel" />
                            <Image src={"/images/client3.webp"} height={150} width={150} alt="logitech" />
                        </div>
                    </div>
                </div>
                <div className="h-125 w-125 hidden sm:block">
                    <Image
                        src={'/images/custom.svg'}
                        width={0}
                        height={0}
                        alt="custom application"
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
        </section>
    )

}
export default HomeC2;