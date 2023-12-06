 // if (cod === "true") {
    //   if (arr === "false") {
    //     await orderModel.create({
    //       order_id: referral,
    //       first_name: firstName,
    //       last_name: lastName,
    //       email: email,
    //       phone_number: parseInt(phoneNumber),
    //       second_phone_number: secondPhoneNumber,
    //       address: address,
    //       pincode: parseInt(pincode),
    //       district: district,
    //       place: place,
    //       total_price: parseInt(amount),
    //       date: new Date(),
    //       products: [product],
    //       order_status: "placed",
    //       payment_status: "pending",
    //       payment_method: "COD",
    //     });
    //   } else {
    //     await orderModel.create({
    //       order_id: referral,
    //       first_name: firstName,
    //       last_name: lastName,
    //       email: email,
    //       phone_number: parseInt(phoneNumber),
    //       second_phone_number: secondPhoneNumber,
    //       address: address,
    //       pincode: parseInt(pincode),
    //       district: district,
    //       place: place,
    //       total_price: parseInt(amount),
    //       date: new Date(),
    //       products: product,
    //       order_status: "placed",
    //       payment_status: "pending",
    //       payment_method: "COD",
    //     });
    //   }
    // }
    // if (cod === "true") {
    //   if (userIdInBooking === null) {
    //     if (arr === "false") {
    //       await bookingModel.create({
    //         user_id: req.body.userId,
    //         orders: [
    //           {
    //             first_name: firstName,
    //             last_name: lastName,
    //             email: email,
    //             phone_number: parseInt(phoneNumber),
    //             second_phone_number: secondPhoneNumber,
    //             address: address,
    //             pincode: parseInt(pincode),
    //             district: district,
    //             place: place,
    //             total_price: parseInt(amount),
    //             date: new Date(),
    //             products: [product],
    //             order_status: "placed",
    //             payment_status: "pending",
    //             payment_method: "COD",
    //           },
    //         ],
    //       });
    //       await cartModel.updateOne(
    //         {
    //           user_id: req.body.userId,
    //         },
    //         {
    //           $pull: {
    //             cart_products: { product_id: new ObjectId(product.product_id) },
    //           },
    //         }
    //       );
    //       await cartModel.updateOne(
    //         {
    //           user_id: req.body.userId,
    //         },
    //         {
    //           $inc: { cart_count: -1 },
    //         }
    //       );
    //       await productModel.updateOne(
    //         { _id: new ObjectId(product.product_id) },
    //         {
    //           $inc: { stock: -product.count },
    //         }
    //       );
    //       const cart = await cartModel.findOne({ user_id: req.body.userId });
    //       res.json({ success: true, cart });
    //     } else {
    //       await bookingModel.create({
    //         user_id: req.body.userId,
    //         orders: [
    //           {
    //             first_name: firstName,
    //             last_name: lastName,
    //             email: email,
    //             phone_number: parseInt(phoneNumber),
    //             second_phone_number: secondPhoneNumber,
    //             address: address,
    //             pincode: parseInt(pincode),
    //             district: district,
    //             place: place,
    //             total_price: parseInt(amount),
    //             date: new Date(),
    //             products: product,
    //             order_status: "placed",
    //             payment_status: "pending",
    //             payment_method: "COD",
    //           },
    //         ],
    //       });
    //       await cartModel.deleteOne({
    //         user_id: req.body.userId,
    //       });
    //       product.forEach(async (item) => {
    //         await productModel.updateOne(
    //           { _id: new ObjectId(item.product_id) },
    //           {
    //             $inc: { stock: -item.count },
    //           }
    //         );
    //       });
    //       const cart = await cartModel.findOne({ user_id: req.body.userId });
    //       res.json({ success: true, cart });
    //     }
    //   } else {
    //     if (arr === "false") {
    //       await bookingModel.findOneAndUpdate(
    //         { user_id: new ObjectId(req.body.userId) },
    //         {
    //           $push: {
    //             orders: {
    //               first_name: firstName,
    //               last_name: lastName,
    //               email: email,
    //               phone_number: parseInt(phoneNumber),
    //               second_phone_number: secondPhoneNumber,
    //               address: address,
    //               pincode: parseInt(pincode),
    //               district: district,
    //               place: place,
    //               total_price: parseInt(amount),
    //               date: new Date(),
    //               products: [product],
    //               order_status: "placed",
    //               payment_status: "pending",
    //               payment_method: "COD",
    //             },
    //           },
    //         }
    //       );
    //       await cartModel.updateOne(
    //         {
    //           user_id: req.body.userId,
    //         },
    //         {
    //           $pull: {
    //             cart_products: { product_id: new ObjectId(product.product_id) },
    //           },
    //         }
    //       );
    //       await cartModel.updateOne(
    //         {
    //           user_id: req.body.userId,
    //         },
    //         {
    //           $inc: { cart_count: -1 },
    //         }
    //       );
    //       await productModel.updateOne(
    //         { _id: new ObjectId(product.product_id) },
    //         {
    //           $inc: { stock: -product.count },
    //         }
    //       );
    //       const cart = await cartModel.findOne({ user_id: req.body.userId });
    //       res.json({ success: true, cart });
    //     } else {
    //       await bookingModel.findOneAndUpdate(
    //         { user_id: new ObjectId(req.body.userId) },
    //         {
    //           $push: {
    //             orders: {
    //               first_name: firstName,
    //               last_name: lastName,
    //               email: email,
    //               phone_number: parseInt(phoneNumber),
    //               second_phone_number: secondPhoneNumber,
    //               address: address,
    //               pincode: parseInt(pincode),
    //               district: district,
    //               place: place,
    //               total_price: parseInt(amount),
    //               date: new Date(),
    //               products: product,
    //               order_status: "placed",
    //               payment_status: "pending",
    //               payment_method: "COD",
    //             },
    //           },
    //         }
    //       );
    //       await cartModel.deleteOne({
    //         user_id: req.body.userId,
    //       });
    //       product.forEach(async (item) => {
    //         console.log(item);
    //         await productModel.updateOne(
    //           { _id: new ObjectId(item.product_id) },
    //           {
    //             $inc: { stock: -item.count },
    //           }
    //         );
    //       });
    //       const cart = await cartModel.findOne({ user_id: req.body.userId });
    //       res.json({ success: true, cart });
    //     }
    //   }
    // } else {
    //   let instance = new Razorpay({
    //     key_id: process.env.KEY_ID,
    //     key_secret: process.env.KEY_SECRET,
    //   });
    //   let options = {
    //     amount: parseInt(amount) * 100,
    //     currency: "INR",
    //   };
    //   console.log(options);
    //   instance.orders.create(options, (err, order) => {
    //     if (err) {
    //       console.log(err);
    //       return res.send({ code: 500, message: "Server Error" });
    //     }
    //     return res.send({
    //       code: 200,
    //       message: "order created",
    //       data: order,
    //       success: true,
    //     });
    //   });
    // }























    export const order = async (req, res) => {
      try {
        let { paymentDetails, arr } = req.query;
        const { product } = req.body;
        let {
          cod,
          online,
          amount,
          firstName,
          lastName,
          address,
          email,
          phoneNumber,
          secondPhoneNumber,
          district,
          place,
          pincode,
        } = paymentDetails;
        const userIdInBooking = await bookingModel.findOne({
          user_id: new ObjectId(req.body.userId),
        });
        if (userIdInBooking === null) {
          await bookingModel.create({
            user_id: req.body.userId,
            orders: [],
          });
        }
        if (secondPhoneNumber !== "") {
          secondPhoneNumber = parseInt(secondPhoneNumber);
        } else {
          secondPhoneNumber = null;
        }
        function generateString(length) {
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let result = "";
          const charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        }
        let referral = generateString(16);
        if (cod === "true") {
          if (arr === "false") {
            await orderModel.create({
              order_id: referral,
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone_number: parseInt(phoneNumber),
              second_phone_number: secondPhoneNumber,
              address: address,
              pincode: parseInt(pincode),
              district: district,
              place: place,
              total_price: parseInt(amount),
              date: new Date(),
              products: [product],
              order_status: "placed",
              payment_status: "pending",
              payment_method: "COD",
            });
          } else {
            await orderModel.create({
              order_id: referral,
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone_number: parseInt(phoneNumber),
              second_phone_number: secondPhoneNumber,
              address: address,
              pincode: parseInt(pincode),
              district: district,
              place: place,
              total_price: parseInt(amount),
              date: new Date(),
              products: product,
              order_status: "placed",
              payment_status: "pending",
              payment_method: "COD",
            });
          }
        }
        if (cod === "true") {
          if (arr === "false") {
            await bookingModel.findOneAndUpdate(
              { user_id: new ObjectId(req.body.userId) },
              {
                $push: {
                  orders: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: parseInt(phoneNumber),
                    second_phone_number: secondPhoneNumber,
                    address: address,
                    pincode: parseInt(pincode),
                    district: district,
                    place: place,
                    total_price: parseInt(amount),
                    date: new Date(),
                    products: [product],
                    order_status: "placed",
                    payment_status: "pending",
                    payment_method: "COD",
                  },
                },
              }
            );
            await cartModel.updateOne(
              {
                user_id: req.body.userId,
              },
              {
                $pull: {
                  cart_products: { product_id: new ObjectId(product.product_id) },
                },
              }
            );
            await cartModel.updateOne(
              {
                user_id: req.body.userId,
              },
              {
                $inc: { cart_count: -1 },
              }
            );
            await productModel.updateOne(
              { _id: new ObjectId(product.product_id) },
              {
                $inc: { stock: -product.count },
              }
            );
            const cart = await cartModel.findOne({ user_id: req.body.userId });
            res.json({ success: true, cart });
          } else {
            await bookingModel.findOneAndUpdate(
              { user_id: new ObjectId(req.body.userId) },
              {
                $push: {
                  orders: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: parseInt(phoneNumber),
                    second_phone_number: secondPhoneNumber,
                    address: address,
                    pincode: parseInt(pincode),
                    district: district,
                    place: place,
                    total_price: parseInt(amount),
                    date: new Date(),
                    products: product,
                    order_status: "placed",
                    payment_status: "pending",
                    payment_method: "COD",
                  },
                },
              }
            );
            await cartModel.deleteOne({
              user_id: req.body.userId,
            });
            product.forEach(async (item) => {
              console.log(item);
              await productModel.updateOne(
                { _id: new ObjectId(item.product_id) },
                {
                  $inc: { stock: -item.count },
                }
              );
            });
            const cart = await cartModel.findOne({ user_id: req.body.userId });
            res.json({ success: true, cart });
          }
        } else {
          let instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
          });
          let options = {
            amount: parseInt(amount) * 100,
            currency: "INR",
          };
          console.log(options);
          instance.orders.create(options, (err, order) => {
            if (err) {
              console.log(err);
              return res.send({ code: 500, message: "Server Error" });
            }
            return res.send({
              code: 200,
              message: "order created",
              data: order,
              success: true,
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    };