
import Main from "@/layouts/Main";
import { CaroClient } from "@/components/client/CaroClient";
import CategoryModalGalary from "@/components/client/CategoryModalGalary";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export const dynamic = 'force-dynamic';

export default function Home() {
  return <div>
    <Main>
      <BackgroundBeamsWithCollision >
        <CaroClient />
      </BackgroundBeamsWithCollision>


      <div className=" relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"

            particleDensity={100}
            className="w-full h-full"
            particleColor="#7BDE49"
          />
        </div>
        {/* <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Build great products
      </h1> */}
        <CategoryModalGalary />
      </div>





    </Main>

  </div>;
}
