"use client";
import { getUserById } from "@/actions/basics/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const labelStyle = "font-semibold text-muted-foreground";
const valueStyle = "text-base font-medium";

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUserById(id);
        setUser(res.resData || null);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-40 text-lg">
        User not found
      </div>
    );
  }

  // Select four main fields for the top cards (customize which fields as needed)
  const cardFields = [
    {
      label: "Username",
      value: user.username || "-",
    },
    { label: "Password", value: user.password || "-" },
    { label: "Memorable Word", value: user.memorableWord || "-" },
    {
      label: "User Status",
      value: user.userStatusId ? String(user.userStatusId) : "-",
    },
  ];

  // Fields for left and right sections (customize as needed)
  const leftDetails = [
    { label: "User Hash ID", value: user.userHashId || "-" },
    {
      label: "eMember ID",
      value: user.eMemberId || "-",
    },
    {
      label: "XPS ID",
      value: user.xpsId || "-",
    },
    { label: "XPS Scheme ID", value: user.xpsSchemeId || "-" },
    { label: "eMember Scheme ID", value: user.eMemberSchemeId || "-" },
  ];

  const rightDetails = [
    { label: "User Email", value: user.userEmail || "-" },
    { label: "Address ID", value: user.addressId || "-" },
    { label: "Postcode", value: user.postcode || "-" },
    { label: "NI Number", value: user.niNumber || "-" },
    {
      label: "Date of Birth",
      value: (user.DOB && new Date(user.DOB).toLocaleDateString()) || "-",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {cardFields.map((field, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {field.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{field.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Main user profile info block */}
      <div className="bg-card rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            User Details
          </h2>
          <dl className="space-y-3">
            {leftDetails.map((item, i) => (
              <div key={i} className="grid grid-cols-2">
                <dt className={labelStyle}>{item.label}</dt>
                <dd className={valueStyle}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {/* Right */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Account Details
          </h2>
          <dl className="space-y-3">
            {rightDetails.map((item, i) => (
              <div key={i} className="grid grid-cols-2">
                <dt className={labelStyle}>{item.label}</dt>
                <dd className={valueStyle}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
