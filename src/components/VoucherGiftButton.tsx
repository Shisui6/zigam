"use client";

export default function VoucherGiftButton({
  subject,
  email,
  outline = true,
  label = "Gift this tier",
}: {
  subject: string;
  email: string;
  outline?: boolean;
  label?: string;
}) {
  return (
    <a
      href="#"
      className={outline ? "btn btn-outline voucher-btn" : "vt-link"}
      onClick={(e) => {
        e.preventDefault();
        const note = (document.getElementById("voucher-note") as HTMLTextAreaElement | null)?.value?.trim();
        const body = note
          ? `Please arrange this gift voucher.\n\nMessage for the recipient:\n"${note}"\n`
          : "Please arrange this gift voucher.";
        const href = `mailto:${email}?subject=${encodeURIComponent(
          "Voucher request: " + subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = href;
      }}
    >
      {outline ? (
        <>
          <i className="fas fa-gift" /> Gift this voucher
        </>
      ) : (
        <>
          {label} <i className="fas fa-arrow-right" />
        </>
      )}
    </a>
  );
}
