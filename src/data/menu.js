import sushi from '../assets/food-sushi.jpg'
import curry from '../assets/food-curry.jpg'
import lasagna from '../assets/food-lasagna.jpg'
import cupcake from '../assets/food-cupcake.jpg'
import pizza from '../assets/food-pizza.jpg'
import pizza2 from '../assets/food-pizza-2.jpg'
import shake from '../assets/food-shake.jpg'
import burger from '../assets/food-burger.jpg'

const SIZES = [
  { id: 'regular', label: 'Regular', extra: 0 },
  { id: 'medium', label: 'Medium', extra: 3 },
  { id: 'large', label: 'Large', extra: 6 },
]

export const products = [
  {
    id: 'salmon-sushi',
    name: 'Salmon Sushi Platter',
    price: 103,
    image: sushi,
    description: 'Fresh salmon nigiri and maki rolls with pickled ginger, wasabi and soy.',
    portionTitle: 'Platter size',
    portions: [
      { id: 'six', label: '6 Pieces', extra: 0 },
      { id: 'twelve', label: '12 Pieces', extra: 40 },
      { id: 'eighteen', label: '18 Pieces', extra: 75 },
    ],
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken Bowl',
    price: 50,
    image: curry,
    description: 'Slow-cooked chicken in a creamy tomato gravy, served over basmati rice.',
    portionTitle: 'Bowl size',
    portions: SIZES,
  },
  {
    id: 'veg-lasagna',
    name: 'Garden Veg Lasagna',
    price: 12.99,
    image: lasagna,
    description: 'Layers of pasta, roasted vegetables, ricotta and a rich marinara sauce.',
    portionTitle: 'Portion size',
    portions: SIZES,
  },
  {
    id: 'berry-cupcake',
    name: 'Berry Cream Cupcake',
    price: 8.2,
    image: cupcake,
    description: 'Vanilla sponge topped with whipped cream frosting and fresh berries.',
    portionTitle: 'Box size',
    portions: [
      { id: 'single', label: 'Single', extra: 0 },
      { id: 'four', label: 'Box of 4', extra: 24 },
      { id: 'six', label: 'Box of 6', extra: 38 },
    ],
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    price: 14,
    image: pizza,
    description: 'Hand-tossed crust with tomato sauce, mozzarella, pepperoni and fresh basil.',
    portionTitle: 'Personal portion',
    portions: [
      { id: 'personal', label: 'Personal (4 Slices)', extra: 0 },
      { id: 'medium', label: 'Medium (8 Slices)', extra: 3 },
      { id: 'familiar', label: 'Familiar (10 Slices)', extra: 6 },
      { id: 'jumbo', label: 'Jumbo (12 Slices)', extra: 10 },
    ],
  },
]

export const bestSellers = products.slice(0, 4)

export const offers = [
  { id: 'new-dish', headline: 'Experience our delicious new dish', deal: '30% OFF', productId: 'pepperoni-pizza' },
  { id: 'weekend', headline: 'Weekend pizza party special', deal: '25% OFF', productId: 'pepperoni-pizza' },
  { id: 'combo', headline: 'Pizza and shake combo deal', deal: '₹99 OFF', productId: 'pepperoni-pizza' },
  { id: 'first-order', headline: 'On your very first order', deal: '50% OFF', productId: 'pepperoni-pizza' },
  { id: 'late-night', headline: 'Late night cravings sorted', deal: '20% OFF', productId: 'pepperoni-pizza' },
]
export const offerImage = pizza

export const recentOrders = [
  { id: 'o1', name: 'Strawberry Shake', image: shake, total: 20, items: 2, placedAt: '29 Nov, 01:20 pm', active: true },
  { id: 'o2', name: 'Chicken Burger', image: burger, total: 20, items: 1, placedAt: '17 Oct, 01:20 pm', active: true },
  { id: 'o3', name: 'Sushi Wave', image: sushi, total: 20, items: 2, placedAt: '22 Apr, 01:20 pm', active: false },
  { id: 'o4', name: 'Pepperoni Pizza', image: pizza2, total: 20, items: 1, placedAt: '29 Nov, 01:20 pm', active: false },
]

export function findProduct(id) {
  return products.find((p) => p.id === id)
}

export function formatPrice(amount) {
  return `₹${amount.toFixed(2)}`
}
