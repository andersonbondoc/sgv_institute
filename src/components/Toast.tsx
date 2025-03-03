import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { alertCircleOutline, checkboxOutline } from "ionicons/icons";

interface ToastProps {
  message: string | null;
  show: boolean;
  status_code?: number | null;
}

export function ToastError({ message, show, status_code }: ToastProps) {
  return (
    <div
      className={`${
        show ? "" : "hidden"
      } absolute z-50 top-4 left-2 right-2 cursor-pointer`}
    >
      <div
        role="alert"
        className="w-[30vh] float-right rounded border-s-4 border-red-500 bg-red-50 p-4 cursor-pointer"
      >
        <div className="flex items-center gap-2 text-red-800">
          <IonIcon icon={alertCircleOutline} className="w-6" />
          <strong className="block font-bold">
            {" "}
            {"Error" + (status_code ? `: ${status_code}` : "")}{" "}
          </strong>
        </div>
        <p className="mt-2 text-sm text-red-700 break-words">{message}</p>
      </div>
    </div>
  );
}

export function ToastSuccess({ message, show }: ToastProps) {
  return (
    <div
      className={`${
        show ? "z-50" : "hidden"
      } absolute z-50 top-4 left-2 right-2 cursor-pointer`}
    >
      <div
        role="alert"
        className="w-[30vh] float-right rounded-xl border-s-4 border-green-500 bg-green-100 p-4 cursor-pointer"
      >
        <div className="flex items-center gap-2 text-green-800">
          <IonIcon icon={checkboxOutline} className="w-6" />
          <strong className="block font-bold"> Success </strong>
        </div>
        <p className="mt-1 text-sm text-green-700 break-words">{message}</p>
      </div>
    </div>
  );
}
