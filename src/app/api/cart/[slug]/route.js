// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db/db";
// import Cart from "@/lib/models/cart.model";
// import Product from "@/lib/models/product.model";
// import User from "@/lib/models/user.model";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const { user, product, quantity } = body;

//     if (!user || !product) {
//       return NextResponse.json(
//         { success: false, message: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     // check if product exists
//     const existingProduct = await Product.findById(product);
//     if (!existingProduct) {
//       return NextResponse.json(
//         { success: false, message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     // check if this product already exists in user's cart
//     let cartItem = await Cart.findOne({ user, product });

//     if (cartItem) {
//       // update quantity
//       cartItem.quantity += quantity || 1;
//       cartItem.totalPrice = cartItem.quantity * existingProduct.price;
//       await cartItem.save();

//       return NextResponse.json({ success: true, cartItem }, { status: 200 });
//     }

//     // if not found, create a new cart entry
//     const newCartItem = await Cart.create({
//       user,
//       product,
//       quantity: quantity || 1,
//       totalPrice: (quantity || 1) * existingProduct.price,
//     });

//     return NextResponse.json({ success: true, newCartItem }, { status: 201 });
//   } catch (error) {
//     console.error("Add to Cart Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req, { params }) {
//   await connectDB();
//   const { userId } = params;

//   try {
//     const cart = await Cart.findOne({ user: userId }).populate("items.product");
//     if (!cart) {
//       return NextResponse.json({ success: true, cart: [] }, { status: 200 });
//     }

//     return NextResponse.json({ success: true, cart: cart.items }, { status: 200 });
//   } catch (error) {
//     console.error("Fetch Cart Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Cart from "@/lib/models/cart.model";
import User from "@/lib/models/user.model";
import Product from "@/lib/models/product.model";

// Create new order
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { userId, productId, quantity } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const order = await Cart.create({ userId, productId, quantity });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order Create Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

//  Get all orders (Admin Dashboard)
export async function GET() {
  try {
    await connectDB();
    const orders = await Cart.find()
      .populate("userId", "email")
      .populate("productId", "name price");

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
