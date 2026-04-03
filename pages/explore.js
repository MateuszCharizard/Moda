import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Explore() {
  const [selectedImage, setSelectedImage] = useState(null);

  const streetwearInspo = [
    {
      id: 1,
      title: 'Classic Oversized Hoodie Fit',
      description: 'Oversized hoodie paired with cargo pants and chunky sneakers for the ultimate comfort streetwear look',
      category: 'Casual',
      image: '/image.png',
      colors: ['Gray', 'Black', 'White'],
    },
    {
      id: 2,
      title: 'Minimalist Tech Streetwear',
      description: 'Monochrome look with tech cargo jacket and slim fit pants, perfect for modern urban style',
      category: 'Modern',
      image: '/image copy.png',
      colors: ['Black', 'Dark Gray', 'White'],
    },
    {
      id: 3,
      title: 'Vintage Denim Stack',
      description: 'Oversized denim jacket with vintage band tee and baggy jeans for authentic retro streetwear vibes',
      category: 'Retro',
      image: '/image copy 2.png',
      colors: ['Denim Blue', 'White', 'Black'],
    },
    {
      id: 4,
      title: 'Athleisure Street Style',
      description: 'Premium tracksuit with matching sneakers and minimal accessories for an elevated athletic aesthetic',
      category: 'Athletic',
      image: '/image copy 3.png',
      colors: ['Navy', 'White', 'Gray'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] font-serif text-gray-900 py-12 px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gray-900">
            Streetwear Inspiration
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Explore curated streetwear styles and outfits to elevate your personal fashion. Find your next favorite look.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {streetwearInspo.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {item.colors.slice(0, 2).map((color, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 z-10"
              >
                ✕
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="p-8">
              <span className="inline-block mb-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {selectedImage.category}
              </span>
              <h2 className="text-3xl font-bold mb-4">{selectedImage.title}</h2>
              <p className="text-lg text-gray-700 mb-6">{selectedImage.description}</p>
              <div>
                <h3 className="font-bold text-lg mb-3">Color Palette</h3>
                <div className="flex gap-3 flex-wrap">
                  {selectedImage.colors.map((color, i) => (
                    <div key={i} className="text-center">
                      <div
                        className={`w-12 h-12 rounded-full mb-2 border-2 border-gray-300 ${
                          color === 'White'
                            ? 'bg-white'
                            : color === 'Black'
                            ? 'bg-black'
                            : color === 'Gray'
                            ? 'bg-gray-500'
                            : color === 'Dark Gray'
                            ? 'bg-gray-700'
                            : color === 'Charcoal'
                            ? 'bg-gray-800'
                            : color === 'Denim Blue'
                            ? 'bg-blue-600'
                            : color === 'Navy'
                            ? 'bg-blue-900'
                            : color === 'Beige'
                            ? 'bg-amber-100'
                            : color === 'Brown'
                            ? 'bg-amber-800'
                            : color === 'Khaki'
                            ? 'bg-yellow-600'
                            : color === 'Neon Yellow'
                            ? 'bg-yellow-300'
                            : 'bg-gray-400'
                        }`}
                      ></div>
                      <p className="text-sm font-semibold">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
