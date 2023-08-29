import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

const TAX_RATE = 0.04;
const SHIP_COST = 10000;

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 1, 30000),
  createRow("Paper (Case)", 10, 4500),
  createRow("Waste Basket", 2, 45000),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Cart() {
  const [cart, setCart] = React.useState([]);
  return (
    <div>
      <div className=" flex flex-col items-center justify-center ">
        <h1 className="mb-5 text-2xl text-left">Keranjang Belanja</h1>
        <div className=" w-fit bg-col3 shadow-gray-600">
          <TableContainer component={Paper}>
            <Table sx={{ width: 1000 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Act</TableCell>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <span className="flex flex-row gap-3">
                        <button
                          onClick={() => {
                            if (product.count > 1) {
                              setCart(
                                cart.map((p) =>
                                  p.id === product.id
                                    ? { ...p, count: p.count - 1 }
                                    : p
                                )
                              );
                            } else {
                              setCart(cart.filter((p) => p.id !== product.id));
                            }
                          }}
                        >
                          <BiMinusCircle size={25} />
                        </button>
                        <button
                          onClick={() => {
                            setCart(
                              cart.map((p) =>
                                p.id === product.id
                                  ? { ...p, count: p.count + 1 }
                                  : p
                              )
                            );
                          }}
                          title="Tambah"
                        >
                          <BiPlusCircle size={25} />
                        </button>
                      </span>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">
                      {product.count.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">
                      {parseInt(product.price)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {parseInt(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{parseInt(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shipping Cost</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{parseInt(SHIP_COST)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{parseInt(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* <Button onClick={() => setIsCartOpen(true)}>
        <BsFillCartPlusFill /> {cart.reduce((a, p) => a + p.count, 0)}
      </Button> */}

      {isCheckout && (
        <div>
          <h1>Checkout</h1>
          <div>
            <h3>Opsi Pengiriman</h3>
            <hr />
          </div>
          <div>
            <h3>J&T Express</h3>
            <p>Rp20.000</p>
          </div>
          <div>
            <h1>Total Pesanan (1 Produk) :</h1>
            <p>Rp509.000</p>
          </div>
          <div></div>
          <Button onClick={handleClick()} variant="contained">
            Buat Pesanan
          </Button>
        </div>
      )}
    </div>
  );
}
