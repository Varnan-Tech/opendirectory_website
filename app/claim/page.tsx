'use client';

import { useState } from 'react';
import { requestOtp, verifyOtp, submitClaim } from '@/actions/claim';
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

export default function ClaimPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [githubEmail, setGithubEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [contributorId, setContributorId] = useState('');
  
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
    shirtSize: 'L' as 'S' | 'M' | 'L' | 'XL' | 'XXL',
  });
  const [acknowledged, setAcknowledged] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await requestOtp(githubEmail);
    if (res.error) {
      setError(res.error);
    } else {
      setStep(2);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await verifyOtp(githubEmail, otp);
    if (res.error) {
      setError(res.error);
    } else if (res.contributorId) {
      setContributorId(res.contributorId);
      setStep(3);
    }
    setLoading(false);
  };

  const handleSubmitClaim = async () => {
    setLoading(true);
    setError('');
    
    const res = await submitClaim(contributorId, {
      ...formData,
      githubEmail,
    });
    
    if (res.error) {
      setError(res.error);
      setIsDialogOpen(false);
    } else {
      setStep(4);
      setIsDialogOpen(false);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Claim Your Merch</h1>
          <p className="text-muted-foreground text-sm">
            {step === 1 && "Enter your GitHub email to verify your contribution."}
            {step === 2 && "Enter the 6-digit code sent to your email."}
            {step === 3 && "Provide your shipping details."}
            {step === 4 && "You're all set!"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="githubEmail">GitHub Email Address</Label>
              <Input
                id="githubEmail"
                type="email"
                required
                value={githubEmail}
                onChange={(e) => setGithubEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-background border-input"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending...' : 'Send Code'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-background border-input text-center tracking-widest text-lg"
                placeholder="000000"
              />
            </div>
            <Button type="submit" disabled={loading || otp.length !== 6} className="w-full">
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(1)}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Back to email
            </Button>
          </form>
        )}

        {step === 3 && (
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
                <Input id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="bg-background border-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="altPhone">Alt Phone (Optional)</Label>
                <Input id="altPhone" name="altPhone" value={formData.altPhone} onChange={handleInputChange} className="bg-background border-input" />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  disabled={!acknowledged || !formData.firstName || !formData.lastName || !formData.contactEmail || !formData.phone || !formData.addressLine1 || !formData.city || !formData.state || !formData.pinCode}
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
                      {formData.city}, {formData.state} {formData.pinCode}
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

        {step === 4 && (
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
    </div>
  );
}