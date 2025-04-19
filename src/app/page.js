
import Main from "@/layouts/Main";
import { CaroClient } from "@/components/client/CaroClient";
import CategoryModalGalary from "@/components/client/CategoryModalGalary";
import AdminDashboard from "./(admin)/admin-panel/_components/AdminDashboard";
import Typer from "@/components/client/Typer";


export default function Home() {
  return <div>
    <Main>
      <CaroClient/>


   


      <CategoryModalGalary/>


    </Main>

  </div>;
}
