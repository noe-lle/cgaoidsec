"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generatePdf } from "@/lib/generatePdf";
import { useRef, useState } from "react";
import SignaturePad from "signature_pad";

export default function Home() {
  const signatureRef = useRef<HTMLCanvasElement>(null);
  const [picture, setPicture] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  let signaturePad: SignaturePad | null = null;

  // Initialize signature pad
  React.useEffect(() => {
    if (signatureRef.current) {
      signaturePad = new SignaturePad(signatureRef.current);
    }
  }, []);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPicture(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clearSignature = () => {
    if (signaturePad) {
      signaturePad.clear();
      setSignature(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    if (picture) formData.append('picture', picture);
    if (signaturePad) {
      const signatureData = signaturePad.toDataURL();
      formData.append('signature', signatureData);
    }
    
    const data = Object.fromEntries(formData.entries());
    
    try {
      const pdfBytes = await generatePdf(data);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CGIDSEC-Form.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <nav className="fixed top-0 left-0 right-0 bg-pcg-blue text-white p-4">
        <div className="flex justify-end space-x-4">
          <a href="/cgidsec-form" className="hover:text-pcg-orange">CGIDSEC Form</a>
          <a href="/adt-waiver" className="hover:text-pcg-orange">ADT WAIVER</a>
        </div>
      </nav>

      <div className="mt-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pcg-orange mb-2">CGIDSEC Form</h1>
        <h2 className="text-xl font-bold text-pcg-blue mb-8">Reservist ID Application</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <input type="radio" id="officer" name="type" />
              <label htmlFor="officer" className="text-black">Reservist Officer</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="enlisted" name="type" />
              <label htmlFor="enlisted" className="text-black">Enlisted Reservist</label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-black">
            <Input name="firstName" placeholder="First Name"/>
            <Input name="lastName" placeholder="Last Name"/>
            <Input name="middleName" placeholder="Middle Name"/>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input name="unitAssignment" placeholder="Unit Assignment"/>
            <Input name="rank" placeholder="Rank"/>
            <Input name="serialNumber" placeholder="Serial Number" />
            <Input name="branchOfService" placeholder="Branch of Service" />
          </div>

          <Input name="homeAddress" placeholder="Home Address (max 48 length)" />
          <Input name="contactNumber" placeholder="Contact Number"/>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <Input 
                name="dateOfBirth" 
                type="date" 
                placeholder="Date of Birth" 
                className="text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select 
                name="gender" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-gray-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select 
                name="maritalStatus" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-gray-400"
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Input name="weight" placeholder="Weight (kg)" />
            <Input name="height" placeholder="Height (cm)" />
            <Input name="eyeColor" placeholder="Color of Eyes" />
            <Input name="hairColor" placeholder="Color of Hair" />
          </div>

          <select name="bloodType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-gray-400">
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <Input name="tin" placeholder="TIN (format: ###-###-####)" />
            <Input name="philhealthNo" placeholder="PHILHEALTH NO. (format: ##-#########-#)" />
          </div>

          <h3 className="text-lg font-semibold text-pcg-blue">Person to be notified in case of emergency</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input name="emergencyFirstName" placeholder="First Name" />
            <Input name="emergencyLastName" placeholder="Last Name" />
            <Input name="emergencyRelationship" placeholder="Relationship" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input name="emergencyAddress" placeholder="Address" />
            <Input name="emergencyContact" placeholder="Contact Number" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-pcg-blue">2x2 Picture (No headgear, White background)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-pcg-blue file:text-white
                  hover:file:bg-pcg-blue/80"
              />
              {picture && (
                <div className="mt-2">
                  <img src={picture} alt="Preview" className="w-32 h-32 object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input name="philsysNo" placeholder="PHILSYS NO." />
            <Input name="religion" placeholder="RELIGION" />
            <Input name="identifyingMark" placeholder="IDENTIFYING MARK" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-400">Signature</label>
            <canvas
              ref={signatureRef}
              className="border border-gray-300 rounded-md w-full h-32 bg-white"
            />
            <button
              type="button"
              onClick={clearSignature}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Clear Signature
            </button>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              DOWNLOAD
            </Button>
            <Button type="reset" className="bg-red-500 hover:bg-red-600 text-white">
              CLEAR FORM
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
