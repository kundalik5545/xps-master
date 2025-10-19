"use client";
import PageHeader from "@/components/myUi/PageHeader";
import React from "react";
import { useParams } from "next/navigation";

const SingleMenuPage = () => {
  const { id } = useParams();
  return (
    <div>
      <PageHeader
        pageTitle="Single Menu"
        pageDesc="Manage your single menu here"
      />
      <h2>Page id is- {id}</h2>
    </div>
  );
};

export default SingleMenuPage;
