import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowUpRightIcon } from "lucide-react";

const Landing = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between px-8 py-2 bg-yellow-200">
        <h1 className="font-bold text-2xl font-space-grotesk text-primary-foreground">
          Daily Task
        </h1>
        <Link to={"/app"}>
          <Button type="button" variant={"outline"}>
            Get Started <ArrowUpRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </nav>
      <main>
        <section className="container mx-auto flex flex-col items-center justify-center min-h-[40vh] mb-4 py-4">
          <h1 className="text-4xl text-center  font-space-grotesk  dark:text-white text-primary-foreground">
            List of Tasks
          </h1>
          <p className=" mt-3 text-lg text-center font-shantell-sans text-wrap dark:text-slate-300 text-primary-foreground">
            Bordei Maria
            <br/>
            Nechifor Daniela
          </p>
        </section>
        <section className="container mx-auto flex flex-col items-center justify-center">
          <Link to={"/app"}>
            <Button
              type="button"
              className="rounded-full text-primary shadow-md"
              variant={"outline"}
            >
              Try it now <ArrowUpRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </section>
        <section className="container mx-auto mt-8 flex justify-center items-center">
          <img
            src="https://i.pinimg.com/736x/1f/1e/ca/1f1ecaa844472e3d90a0929af306b305.jpg" // Replace with your image URL
            alt="Tasks Illustration"
            className="w-full max-w-2xl rounded-lg shadow-lg"
          />
        </section>
      </main>
    </>
  );
};

export default Landing;
