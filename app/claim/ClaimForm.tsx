'use client';

import { useState } from 'react';
import { submitClaim } from '@/actions/claim';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ClaimForm({ githubEmail }: { githubEmail: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactEmail: '',
    phone: '',
    altPhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    shirtSize: 'L' as 'S' | 'M' | 'L' | 'XL' | 'XXL',
  });
  const [acknowledged, setAcknowledged] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitClaim = async () => {
    setLoading(true);
    setError('');
    
    const res = await submitClaim({
      ...formData,
      githubEmail,
    });
    
    if (res.error) {
      setError(res.error);
      setIsDialogOpen(false);
    } else {
      setStep(2);
      setIsDialogOpen(false);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary">Open Directory</h1>
        <h2 className="text-xl font-semibold tracking-tight mb-2">Claim Your Merch</h2>
        <p className="text-muted-foreground text-sm">
          {step === 1 && "Provide your shipping details."}
          {step === 2 && "You're all set!"}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="bg-background border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="bg-background border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" name="contactEmail" type="email" required value={formData.contactEmail} onChange={handleInputChange} className="bg-background border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  +91
                </span>
                <Input id="phone" name="phone" type="tel" maxLength={10} required value={formData.phone} onChange={handleInputChange} className="bg-background border-input rounded-l-none" placeholder="9876543210" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="altPhone">Alt Phone (Optional)</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  +91
                </span>
                <Input id="altPhone" name="altPhone" type="tel" maxLength={10} value={formData.altPhone} onChange={handleInputChange} className="bg-background border-input rounded-l-none" placeholder="9876543210" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shirtSize">Shirt Size</Label>
              <select
                id="shirtSize"
                name="shirtSize"
                value={formData.shirtSize}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
                <option value="XXL">XX-Large</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input id="addressLine1" name="addressLine1" required value={formData.addressLine1} onChange={handleInputChange} className="bg-background border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
              <Input id="addressLine2" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="bg-background border-input" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} className="bg-background border-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" required value={formData.state} onChange={handleInputChange} className="bg-background border-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pinCode">PIN / ZIP Code</Label>
                <Input id="pinCode" name="pinCode" required value={formData.pinCode} onChange={handleInputChange} className="bg-background border-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" required value={formData.country} onChange={handleInputChange} className="bg-background border-input" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Checkbox id="terms" checked={acknowledged} onCheckedChange={(c) => setAcknowledged(c as boolean)} />
            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
              I acknowledge that the provided information is correct and I am eligible for this claim.
            </Label>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={
              <Button 
                className="w-full mt-6" 
                disabled={!acknowledged || !formData.firstName || !formData.lastName || !formData.contactEmail || !formData.phone || !formData.addressLine1 || !formData.city || !formData.state || !formData.pinCode || !formData.country}
              >
                Review Submission
              </Button>
            } />
            <DialogContent className="sm:max-w-[500px] bg-background border-border text-foreground">
              <DialogHeader>
                <DialogTitle>Review Your Details</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Please verify your shipping information before submitting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 text-sm">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Name:</span>
                  <span className="col-span-3">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Email:</span>
                  <span className="col-span-3">{formData.contactEmail}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Phone:</span>
                  <span className="col-span-3">{formData.phone} {formData.altPhone && `(Alt: ${formData.altPhone})`}</span>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <span className="font-medium text-muted-foreground">Address:</span>
                  <span className="col-span-3">
                    {formData.addressLine1}<br />
                    {formData.addressLine2 && <>{formData.addressLine2}<br /></>}
                    {formData.city}, {formData.state} {formData.pinCode}<br />
                    {formData.country}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Size:</span>
                  <span className="col-span-3">{formData.shirtSize}</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border text-foreground hover:bg-accent hover:text-accent-foreground">
                  Edit Details
                </Button>
                <Button onClick={handleSubmitClaim} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Claim'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {step === 2 && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Claim Submitted!</h2>
          <p className="text-muted-foreground text-sm">
            We've received your shipping details. Your merch will be on its way soon!
          </p>
        </div>
      )}
    </div>
  );
}
