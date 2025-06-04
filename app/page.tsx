const HomePage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Pricing Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Starter</h2>
          <p className="text-gray-600 mb-4">Ideal for individuals and small teams getting started.</p>
          <div className="text-3xl font-bold">GH₵ 294</div>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>10 Users</li>
            <li>5 Projects</li>
            <li>Basic Support</li>
          </ul>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
        </div>

        {/* Business Plan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Business</h2>
          <p className="text-gray-600 mb-4">Perfect for growing businesses with more complex needs.</p>
          <div className="text-3xl font-bold">GH₵ 894</div>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>50 Users</li>
            <li>20 Projects</li>
            <li>Priority Support</li>
          </ul>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Enterprise</h2>
          <p className="text-gray-600 mb-4">For large organizations requiring advanced features and support.</p>
          <div className="text-3xl font-bold">Custom</div>
          <p className="text-sm text-gray-500">contact for pricing</p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Unlimited Users</li>
            <li>Unlimited Projects</li>
            <li>24/7 Support</li>
          </ul>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Contact Us
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-4">Additional Services</h2>
        <ul className="list-none text-gray-700 text-center">
          <li>Starting at GH₵ 0.30 per SMS</li>
          <li>Starting at GH₵ 0.60 per minute</li>
          <li>Starting at GH₵ 0.12 per email</li>
          <li>Starting at GH₵ 0.90 per message</li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage
