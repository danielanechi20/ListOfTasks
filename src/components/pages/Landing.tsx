import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features } from "@/data/data";

const Landing = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 0.95]);
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
            The task-manager <br />
            <span className="bg-yellow-200 text-primary-foreground">
              you've
            </span>{" "}
            always wanted
          </h1>
          <p className=" mt-3 text-lg text-center font-shantell-sans text-wrap dark:text-slate-300 text-primary-foreground">
            Streamline Your Workflow, Boost Productivity, and Stay Organized
            with Our Intuitive Task Management App
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
          <motion.p
            initial={{ scale: 0.7 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            whileInView={{ scale: 1 }}
            className=" mt-3 text-lg text-center font-space-grotesk text-wrap dark:text-slate-300 text-primary-foreground"
          >
            Join Thousands of Users Who Have Simplified Their Workflows with{" "}
            <span className="bg-yellow-200 text-xl text-primary-foreground">
              daily task.
            </span>
            <br />
            Sign Up Today and Experience the Difference!
          </motion.p>
        </section>

        <section className="container mt-4 mx-auto flex flex-col items-center justify-center">
          <motion.div style={{ scale }}>
            <img
              className="border rounded-md"
              src="/task_cover_pic.png"
              alt="task-image"
            />
          </motion.div>
        </section>
        <section className="p-4">
          <h1 className="text-center text-3xl font-space-grotesk m-4">
            Key Features
          </h1>
          <div className="container mx-auto grid grid-cols-12 gap-2 mt-4">
            {features.map((feature) => (
              <motion.div
                initial={{ scale: 0.7 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                whileInView={{ scale: 1 }}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-2"
              >
                <Card className="h-full w-full" key={feature.id}>
                  <CardHeader>
                    <CardTitle className="font-space-grotesk">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-shantell-sans">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p className="container mx-auto flex items-center justify-center py-2">
          Made with <span className="text-red-500 mx-2">♥</span>
          by
          <a
            href="https://www.linkedin.com/in/sheikh-sulaiman/"
            target="_blank"
            className="font-shantell-sans ml-2 underline underline-offset-2"
          >
            sulaiman
          </a>
        </p>
        <div className="container mx-auto flex items-center justify-center py-4">
          <p className="text-center text-lg font-space-grotesk text-yellow-200">
            &copy; 2024 Daily Task. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Landing;
