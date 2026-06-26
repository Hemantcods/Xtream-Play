import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <Button >Home</Button>
          <Button>My Tournaments</Button>
          <Button>Schedule</Button>
          <Button>Leaderboard</Button>
          <Button>Contact Us</Button>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default page;
