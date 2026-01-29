import Layout from "@/components/Layout";
import { Head } from "@inertiajs/react";

const NotFound = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-20 mx-3 md:px-4">
            <Head title="Quizium | No encontrado" />
            <h2 className="text-white font-roboto text-[180px] md:text-[250px] lg:text-[300px] lg:min-w-44">
                :(
            </h2>
            <div className="text-white font-nunito pt-16 lg:pt-28">
                <h2 className="text-[60px] md:text-[80px] lg:text-[100px] text-center lg:text-left">
                    Ooops!
                </h2>
                <p className="uppercase text-2xl md:text-3xl lg:text-4xl text-center lg:text-left">
                    La página que buscas no se ha encontrado
                </p>
            </div>
        </div>
    );
};

NotFound.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default NotFound;
