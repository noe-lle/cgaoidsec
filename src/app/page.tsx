import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <nav className="fixed top-0 left-0 right-0 bg-pcg-blue text-white p-4">
        <div className="flex justify-end space-x-4">
          <a href="/cgidsec-form" className="hover:text-pcg-orange">CGIDSEC Form</a>
          <a href="/adt-waiver" className="hover:text-pcg-orange">ADT WAIVER</a>
        </div>
      </nav>

      <div className="mt-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pcg-orange mb-2">CGIDSEC Form</h1>
        <h2 className="text-xl text-gray-600 mb-8">Reservist ID Application</h2>

        <form className="space-y-6">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <input type="radio" id="officer" name="type" />
              <label htmlFor="officer">Reservist Officer</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="enlisted" name="type" />
              <label htmlFor="enlisted">Enlisted Reservist</label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Middle Name" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Unit Assignment" defaultValue="855TH EESBn" />
            <Input placeholder="Rank" />
            <Input placeholder="Serial Number" />
            <Input placeholder="Branch of Service" defaultValue="PA" />
          </div>

          <Input placeholder="Home Address (max 48 length)" />
          <Input placeholder="Contact Number" />

          <div className="grid grid-cols-3 gap-4">
            <Input type="date" placeholder="Date of Birth" />
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Input placeholder="Weight (kg)" />
            <Input placeholder="Height (cm)" />
            <Input placeholder="Color of Eyes" />
            <Input placeholder="Color of Hair" />
          </div>

          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
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
            <Input placeholder="TIN (format: ###-###-####)" />
            <Input placeholder="PHILHEALTH NO. (format: ##-#########-#)" />
          </div>

          <h3 className="text-lg font-semibold">Person to be notified in case of emergency</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Relationship" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Address" />
            <Input placeholder="Contact Number" />
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
