'use client';
import { useState } from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Share Property</h3>
      <div className="flex gap-4 justify-center mt-2">
        <FacebookShareButton
          url={shareUrl}
          quote={property.title}
          hashtag={`${property.type.replace(/\s/g, '')}ForRent`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <button onClick={copyToClipboard}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </>
  );
};

export default ShareButtons;
