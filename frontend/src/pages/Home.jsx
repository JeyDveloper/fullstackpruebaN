import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-screen flex absolute bg-white shadow-inner animate-slade -z-10">
        <div className="curve animamte-slade flex absolute shadow-[-20px_3px_10px_4px_rgba(197,197,197,1)] bg-white shadow-gray"></div>
      </div>

      <div className="w-full flex-col h-[calc(100vh-70px)] p-10 justify-center block">
        {/*Botones de navegación de páginas*/}
        <div className="z-30 flex space-x-4">
          <Link to={"/"} className="hover:cursor-pointer z-30">
            <img src="/Imagologo_motion.svg" className="w-10" />
          </Link>
          <Link to={"/customers"} className="hover:cursor-pointer z-30">
            <img src="/Icon_Customers.svg" className="w-10" />
          </Link>
        </div>
        {/*Contenido principal de la página*/}
        <div className="flex z-10 justify-center">
          <h1 className="text-blue-dark z-40 text text-7xl m-24 text-center text-stroke font-extrabold absolute animate-text">
            Bienvenido a <br /> Monitoring Innovation
          </h1>
          <img src="/Telefono-01.png" className="w-96 relative z-20" />
        </div>
      </div>
      {/*Pie de página*/}
      <footer className="w-full flex-col px-64 block">
        <div className="w-full flex justify-between">
          <a
            href="https://monitoringinnovation.com"
            className="text-blue-light"
          >
            Monitoring Innovation
          </a>
          <a href="https://gpscontrol.co" className="text-blue-light">
            GPS control
          </a>
          <a href="" className="text-blue-light">
            Link Repo Front
          </a>
          <a href="" className="text-blue-light">
            Link Repo Back
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
