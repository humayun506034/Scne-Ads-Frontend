

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

const BundlePaymentDetailsModal = ({ selectedPayment, closeModal }: any) => {
  return (
    <Dialog.Root open={true} onOpenChange={closeModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-lg p-6 shadow-lg">
          <Dialog.Title className="text-2xl font-bold mb-6">
            {selectedPayment?.bundle.bundle_name} - Payment Details
          </Dialog.Title>

          {/* Payment Info */}
          <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-lg mb-2">Payment Information</h4>
            <p><strong>ID:</strong> {selectedPayment?.id}</p>
            <p><strong>Transaction ID:</strong> {selectedPayment?.transactionId}</p>
            <p><strong>Amount:</strong> ${selectedPayment?.amount}</p>
            <p><strong>Status:</strong> {selectedPayment?.status}</p>
            <p><strong>Purchased:</strong> {new Date(selectedPayment?.createdAt).toLocaleString()}</p>
          </div>

          {/* Customer Info */}
          <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-lg mb-2">Customer Information</h4>
            <p><strong>Name:</strong> {selectedPayment?.user.first_name} {selectedPayment?.user.last_name}</p>
            <p><strong>Email:</strong> {selectedPayment?.user.email}</p>
            <p><strong>User ID:</strong> {selectedPayment?.user.id}</p>
          </div>

          {/* Bundle Info */}
          <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-lg mb-2">Bundle Information</h4>
            <img
              src={selectedPayment?.bundle.img_url}
              alt={selectedPayment?.bundle.bundle_name}
              className="w-40 h-28 object-cover rounded mb-3"
            />
            <p><strong>Bundle ID:</strong> {selectedPayment?.bundle.id}</p>
            <p><strong>Slug:</strong> {selectedPayment?.bundle.slug}</p>
            <p><strong>Price:</strong> ${selectedPayment?.bundle.price}</p>
            <p><strong>Duration:</strong> {selectedPayment?.bundle.duration}</p>
            <p><strong>Status:</strong> {selectedPayment?.bundle.status}</p>
            <p><strong>Location:</strong> {selectedPayment?.bundle.location}</p>
          </div>

          {/* Screens */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-4">Screens</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {(selectedPayment?.bundle?.screens || []).map((screen: any) => (
                <div
                  key={screen.id}
                  className="border rounded p-3 bg-gray-800"
                >
                  <img
                    src={screen.img_url}
                    alt={screen.screen_name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-medium">{screen.screen_name}</p>
                  <p className="text-xs text-gray-400">{screen.location}</p>
                  <p className="text-xs text-gray-400">Size: {screen.screen_size}</p>
                  <p className="text-xs text-gray-400">Resolution: {screen.resolution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Uploaded Contents */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-4">Uploaded Contents</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {(selectedPayment?.contentUrls || []).map((contentUrl: string, index: number) => (
                <div key={index} className="border rounded p-2 bg-gray-800">
                  {contentUrl.endsWith('.mp4') ? (
                    <video controls className="w-full h-32 object-cover rounded">
                      <source src={contentUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={contentUrl}
                      alt={`Uploaded Content ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-2 text-gray-300 hover:bg-gray-700"
              aria-label="Close"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default BundlePaymentDetailsModal
