"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

interface AuthModalProps {
  children: React.ReactNode;
  defaultTab?: "sign-in" | "sign-up";
}

export function AuthModal({
  children,
  defaultTab = "sign-in",
}: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-xl font-semibold">
          {defaultTab === "sign-in" ? "Welcome back" : "Create an account"}
        </DialogTitle>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm onSuccess={() => setIsOpen(false)} />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm onSuccess={() => setIsOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
