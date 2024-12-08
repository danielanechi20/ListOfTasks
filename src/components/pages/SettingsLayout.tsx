import { Separator } from "@/components/ui/separator";

import { Outlet } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

export default function SettingsLayout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex space-y-0.5">
          <Button
            onClick={() => navigate(-1)}
            variant={"ghost"}
            className="mr-2"
          >
            <ArrowLeftIcon />
          </Button>
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <ModeToggle />
          </div>
        </div>

        <Separator />
        <div className=" container flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
