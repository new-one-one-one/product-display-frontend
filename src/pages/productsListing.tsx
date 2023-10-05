import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import {
  Grid,
  Alert,
  Button,
  Input,
  Paper,
  Select,
  Skeleton,
  FormControl,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { ExpandMore, MonetizationOn, Search, Star } from "@mui/icons-material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import {
  createProduct,
  getAllProducts,
} from "../apiCalls/products/getProducts";
import { ProductCard } from "../components/productsCard";
import { IProduct, SORT_OPTIONS } from "../interfaces/product";

export const ProductListingPage = () => {
  const [productsData, setProductsData] = useState<Array<IProduct>>([]);
  const [showLoader, setShowLoader] = useState(true);
  const { addToast } = useToasts();

  const [orderedData, setOrderedData] = useState<Array<IProduct>>(
    Array(100).fill(0),
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOptions, setSortOptions] = useState({
    price: SORT_OPTIONS.ASCENDING,
    averageRating: SORT_OPTIONS.DESCENDING,
  });

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProductsData(data);
        setOrderedData(data);
        setShowLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredProducts = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setOrderedData(filteredProducts);
  }, [searchQuery, productsData]);

  const sortProducts = (field: string, direction: string) => {
    const sortedProducts = [...orderedData].sort((a: any, b: any) => {
      if (direction === SORT_OPTIONS.ASCENDING) {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });
    setOrderedData(sortedProducts);
  };

  useEffect(() => {
    sortProducts("price", sortOptions.price);
  }, [sortOptions.price]);

  useEffect(() => {
    sortProducts("averageRating", sortOptions.averageRating);
  }, [sortOptions.averageRating]);

  const handleSorting = (e: any) => {
    const name = e.target.name;
    if (name === "priceSort") {
      setSortOptions((prevOptions) => ({
        ...prevOptions,
        price: e.target.value,
      }));
    } else {
      setSortOptions((prevOptions) => ({
        ...prevOptions,
        averageRating: e.target.value,
      }));
    }
  };

  const topBarFilterSection = () => {
    return (
      <Paper elevation={0} style={{ padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sm={6}>
            <FormControl fullWidth style={{ minWidth: 200 }}>
              <InputLabel variant="outlined">Search By Product Name</InputLabel>
              <Input
                startAdornment={<Search />}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                value={searchQuery}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <FormControl fullWidth style={{ minWidth: 200 }}>
              <InputLabel>Sort by Price</InputLabel>
              <Select
                startAdornment={<MonetizationOn />}
                name="priceSort"
                variant="standard"
                onChange={handleSorting}
                value={sortOptions.price}
              >
                <MenuItem value={SORT_OPTIONS.ASCENDING}>Low to High</MenuItem>
                <MenuItem value={SORT_OPTIONS.DESCENDING}>High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <FormControl fullWidth style={{ minWidth: 200 }}>
              <InputLabel>Sort by Rating</InputLabel>
              <Select
                startAdornment={<Star />}
                name="ratingSort"
                variant="standard"
                onChange={handleSorting}
                value={sortOptions.averageRating}
              >
                <MenuItem value={SORT_OPTIONS.ASCENDING}>Low to High</MenuItem>
                <MenuItem value={SORT_OPTIONS.DESCENDING}>High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sm={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSortOptions({
      price: SORT_OPTIONS.ASCENDING,
      averageRating: SORT_OPTIONS.DESCENDING,
    });
  };

  const handlePurchaseClick = (purchasedProduct: IProduct) => {
    createProduct(purchasedProduct)
      .then((message) => {
        addToast(`${purchasedProduct.name} successfully purchased`, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      })
      .catch((err) => {
        addToast(`failed to purchase product : ${purchasedProduct.name} `, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        console.log(err);
      });
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 4, md: 4 }}
        columns={{ xs: 24, sm: 24, md: 24 }}
      >
        <Grid item xs={24} sm={24} md={24}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" fontWeight={800} color={"text.primary"}>
                Filter Section
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{topBarFilterSection()}</AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={24} sm={24} md={24}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 3, sm: 12, md: 24 }}
          >
            {orderedData.map((product: IProduct, index: number) => (
              <Grid item xs={4} sm={3} md={4} key={index}>
                {showLoader ? (
                  <Skeleton width={200} height={300} />
                ) : (
                  <ProductCard
                    productDetails={product}
                    productActions={{
                      onPurchaseClick: () => handlePurchaseClick(product),
                    }}
                  />
                )}
              </Grid>
            ))}
            {orderedData.length === 0 && (
              <Alert severity="error" icon={<SentimentDissatisfiedIcon />}>
                Sorry we don't find any products please try to clear filters and
                make search again
              </Alert>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
