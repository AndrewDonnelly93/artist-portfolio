// /app/api/submit-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from 'contentful-management';

const resend = new Resend(process.env.RESEND_API_KEY);

// Contentful config
const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!, // Must be 'Content Management API' token
});

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID || 'master';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    debugger;
    console.log('🎯 Incoming order:', body);
    const {
      sessionId,
      paintingId,
      email,
      name,
      deliveryInfo,
      purchaseType,
      paintingTitle,
      comment,
    } = body;

    // 1. Send notification email
    const message = `
New order received!

Session ID: ${sessionId}
Customer: ${name} (${email})

Painting ID: ${paintingId}
Painting Title: ${paintingTitle}
Purchase Type: ${purchaseType}
Address:
${deliveryInfo.addressLine1}
${deliveryInfo.addressLine2}
${deliveryInfo.city}, ${deliveryInfo.postalCode}
${deliveryInfo.country}

Phone: ${deliveryInfo.phone || '(Not provided)'}
Comment: ${comment || '(None)'}
`;

    await resend.emails.send({
      from: 'orders@davidmceweninternational.ie', // Use a verified sender
      to: ['david@davidmceweninternational.ie', 'andrew.donnelly.1403@gmail.com', email],
      subject: `🎨 New Order – ${paintingId}`,
      text: message,
    });

    // 2. Optional: Update Contentful entry
    // if (process.env.UPDATE_CONTENTFUL === 'true') {
    //   const managementEnv = await contentfulClient
    //     .getSpace(SPACE_ID)
    //     .then((space) => space.getEnvironment(ENVIRONMENT_ID));

    //   const entry = await managementEnv.getEntry(paintingId);

    //   const current = entry.fields;

    //   const updatedFields: any = {};

    //   if (purchaseType === 'original') {
    //     updatedFields.availableForSale = { 'en-US': false };
    //   } else if (purchaseType === 'print') {
    //     updatedFields.printAvailable = { 'en-US': false };
    //   }

    //   entry.fields = {
    //     ...current,
    //     ...updatedFields,
    //   };

    //   await entry.update();
    //   await entry.publish();
    // }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Submit order error:', err?.message || err);
    console.error(err?.stack || '');
    return NextResponse.json({ error: 'Failed to process order.' }, { status: 500 });
  }
}
