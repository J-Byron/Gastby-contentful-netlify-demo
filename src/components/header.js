import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import gatsbyImage from '../images/gatsby-icon.png'

const isActive = ({ isCurrent }) => {
  return { className: isCurrent ? 'active': 'navlink' }
}

// Create a functional component that creates a highlighted link if we are on 
// the links corresponding page
const NavLink = props => ( <Link getProps={isActive} {...props} ></Link>)

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    > 
      <span style={{ display: 'flex' }}>
        <img src={gatsbyImage} alt={'hand grnade'} 
        style={{ 
          width: '50px', 
          borderRadius: '50%', 
          border: '3px solid orange', 
          margin: '0 15px'
          }}/>
        <h1 style={{ margin: 0 }}>
          <NavLink
            to="/"
          >
            {siteTitle}
          </NavLink>
        </h1>
      </span>

      <NavLink to="/blog"> Blog </NavLink>
      <NavLink to="products"> Products </NavLink>

      {/* Shopping cart sumamrt  */}
      <div style={{ color: 'white', cursor: 'pointer' }} className='snipcart-summary snipcart-checkout'>
            <div>
              <strong>
                My Cart
              </strong>
            </div>


            <div>
              <span style={{ fontWeight: 'bold' }} className="snipcart-total-items">

              </span>{" "}Items in Cart

              <div>
                Total Price{' '} <span style={{ fontWeight: 'bold' }} className="snipcart-total-price"> </span>
              </div>
            </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
