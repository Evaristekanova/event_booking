"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { UsersColumns } from "./UsersColumns";
import Table from "../../../components/table/table";
import { useUsers } from "@/app/hooks";
import Modal from "@/app/components/shared/Modal";
import Button from "@/app/components/shared/Button";
import { useActivateUser, useDeactivateUser } from "@/app/hooks/useUsers";
import Loader from "@/app/components/shared/Loader";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const { isAdmin } = useAuth();

  const { data: users, isLoading } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { mutate: activateUser } = useActivateUser();
  const { mutate: deactivateUser } = useDeactivateUser();

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleActivate = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeactivate = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <ProtectedRoute requireAdmin={true}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage user accounts, roles, and permissions
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-3">
            <Table
              data={users?.data || []}
              columns={UsersColumns({
                onActivate: handleActivate,
                onDeactivate: handleDeactivate,
                isAdmin,
              })}
              searchKey="fullName"
              searchPlaceholder="Search users by name..."
            />
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`${
            selectedUser?.status === "ACTIVE" ? "Deactivate" : "Activate"
          } User`}
        >
          <p className="text-gray-900 font-light">
            {`Are you sure you want to
            ${selectedUser?.status === "ACTIVE" ? "deactivate" : "activate"}`}
            <span className="font-extrabold ml-2">
              {selectedUser?.fullName}?`
            </span>
          </p>
          <div className="flex justify-end gap-2 mt-5">
            <Button onClick={closeModal} className="bg-gray-400! text-white">
              Cancel
            </Button>
            {selectedUser?.status === "ACTIVE" ? (
              <Button
                onClick={() =>
                  deactivateUser(selectedUser!.id, {
                    onSuccess: () => {
                      closeModal();
                    },
                  })
                }
                className="bg-red-500 text-white"
              >
                Deactivate
              </Button>
            ) : (
              <Button
                onClick={() =>
                  activateUser(selectedUser!.id, {
                    onSuccess: () => {
                      closeModal();
                    },
                  })
                }
                className="bg-green-500 text-white"
              >
                Activate
              </Button>
            )}
          </div>
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
