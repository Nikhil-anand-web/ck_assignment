
import Main from "@/layouts/Main";
import { CaroClient } from "@/components/client/CaroClient";
import CategoryModalGalary from "@/components/client/CategoryModalGalary";

export const dynamic = 'force-dynamic';

export default function Home() {
  return <div>
    <Main>
      <CaroClient />

     



      <CategoryModalGalary />


    </Main>

  </div>;
}
