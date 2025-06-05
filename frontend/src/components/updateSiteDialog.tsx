import { INTERVAL_CHECK } from "@/constant";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Loader, Plus, Sparkles } from "lucide-react";
import { updateWebsite as UpdateWebsiteType } from "@/types";
import { tryCatchHandler } from "@/lib/tryCatchHandler";
import axios from "axios";
import { toast } from "sonner";

const UpdateSiteDialog = ({
  checkInterval,
  emailId,
  monitorId,
  telegramId,
  url,
  websiteName,
  isEmail,
  isTelegram,
  closeDialog,
}: UpdateWebsiteType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState<UpdateWebsiteType>({
    monitorId,
    websiteName,
    url,
    emailId,
    telegramId,
    checkInterval,
    isEmail,
    isTelegram,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/updateSite`,
        form
      );
      if (closeDialog) closeDialog();
toast.success("Updated!")
    } catch (error) {
      toast.warning("fail!");
    } finally {
        if (closeDialog) closeDialog();
      setIsLoading(false);


    }
  };

  useEffect(() => {
    setForm({
      monitorId,
      websiteName,
      url,
      emailId,
      telegramId,
      checkInterval,
      isEmail,
      isTelegram,
    });
  }, [
    monitorId,
    websiteName,
    url,
    emailId,
    telegramId,
    checkInterval,
    isEmail,
    isTelegram,
  ]);

  return (
    <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-border/50 mx-4">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>Update Monitor</span>
        </DialogTitle>
        <DialogDescription>
          Update website to monitor for uptime and performance.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            placeholder="My Website"
            value={form.websiteName || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, websiteName: e.target.value }))
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={form.url || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">
            Alert Email ID{" "}
            <span className="text-xs font-extralight">(optional)</span>
          </Label>
          <Input
            id="email"
            placeholder="example@xyz.com"
            value={form.emailId || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, emailId: e.target.value }))
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="telegram">
            Alert Telegram chat ID{" "}
            <span className="text-xs font-extralight">
              (optional) —
              <a
                href="https://t.me/UptimeGuartbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-600 ml-1"
              >
                <span className="text-xs font-bold">Get your chat ID</span>
              </a>
            </span>
          </Label>
          <Input
            id="telegram"
            placeholder="123456789"
            value={form.telegramId || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, telegramId: e.target.value }))
            }
          />
        </div>

        <div className="grid gap-2">
          <Label>Select Interval</Label>
          <div className="flex w-full space-x-4">
            {INTERVAL_CHECK.map((item) => (
              <Button
                key={item.value}
                variant={
                  form.checkInterval === item.value ? "default" : "outline"
                }
                onClick={() =>
                  setForm((prev) => ({ ...prev, checkInterval: item.value }))
                }
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="submit"
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-gradient-to-r from-primary to-primary/80 flex items-center"
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Update Monitor
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default UpdateSiteDialog;
