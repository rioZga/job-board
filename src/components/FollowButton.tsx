"use client";

import { UserWithCompanies } from "@/lib/prisma";
import { Company } from "@prisma/client";
import { onFollowCompany, onUnfollowCompany } from "@/app/jobs/[slug]/actions";
import { useEffect, useState } from "react";
import { registerPushNotifications } from "@/notifications/pushService";
import { registerServiceWorker } from "@/lib/serviceWorker";

interface FollowButtonProps extends React.HTMLProps<HTMLSpanElement> {
  user: UserWithCompanies;
  company: Company;
}

enum actionType {
  follow,
  unfollow,
}

export default function FollowButton({
  user,
  company,
  ...rest
}: FollowButtonProps) {
  const [following, setFollowing] = useState(
    !!user.companies.find((c) => c.id === company.id),
  );
  async function handleOnClick(type: actionType) {
    try {
      if (type === actionType.follow) {
        setFollowing(true);
        await onFollowCompany(user.id, company.id);
        await registerPushNotifications();
      } else {
        setFollowing(false);
        await onUnfollowCompany(user.id, company.id);
      }
    } catch (error) {
      console.error(error);
      if (type === actionType.follow && Notification.permission === "denied") {
        alert(
          "Please enable notifications in your browser settings to get the newest job posts.",
        );
      }
    }
  }

  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.error(error);
      }
    }
    setUpServiceWorker();
  }, []);

  return (
    <span
      {...rest}
      onClick={() =>
        handleOnClick(following ? actionType.unfollow : actionType.follow)
      }
      className="ml-2 cursor-pointer text-muted-foreground underline"
    >
      {following ? "unfollow" : "follow"}
    </span>
  );
}
