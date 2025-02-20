"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  email: string;
  phone: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ email, phone }) => {
  const [open, setOpen] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
    setOpen(false);
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phone}`;
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Contact Lister</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm ">
        <DialogHeader>
          <DialogTitle>How would you like to contact?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={handleEmailClick}>
            📧 Email
          </Button>
          <Button variant="outline" onClick={handleCallClick}>
            📞 Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
