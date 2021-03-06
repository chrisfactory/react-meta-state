import PropTypes from 'prop-types';
import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import styled from 'astroturf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import pkg from '../../../package.json';
import logo from '../assets/logo.svg';

const StyledNavbar = styled(Navbar).attrs({
  as: 'header',
  variant: 'dark',
  role: 'banner',
})`
  @import '../css/theme.scss';

  min-height: 4rem;
  background-color: $darker;
  z-index: 1;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: 0rem;
    z-index: 1040;
  }
`;

const SkipToContentLink = styled('a')`
  composes: sr-only sr-only-focusable bg-primary text-white px-4 py-2 mr-2 from global;
`;

const StyledNavLink = styled(Nav.Link)`
  @import '../css/theme.scss';

  & + & {
    margin-left: $spacer;
  }

  &:global(.active) {
    font-width: 700;
  }
`;

const NAV_LINKS = [
  {
    link: '/',
    title: 'Home',
    exact: true,
  },
  {
    link: '/api/api',
    title: `React Meta State ${pkg.version}`,
    exact: true,
  },
];

const propTypes = {
  activePage: PropTypes.string,
};

function NavMain({ activePage }) {
  return (
    <>
      <StyledNavbar expand collapseOnSelect>
        <SkipToContentLink href="#rb-docs-content" tabIndex="0">
          Skip to content
        </SkipToContentLink>
        <Navbar.Brand href="/">
          <img src={logo} alt="react-meta-state" height={30} />
        </Navbar.Brand>

        <Nav role="navigation" id="top" className="d-none d-md-flex">
          {NAV_LINKS.map(({ link, title, exact }) => (
            <StyledNavLink
              key={link}
              href={link}
              active={exact ? activePage === link : activePage.startsWith(link)}
            >
              {title}
            </StyledNavLink>
          ))}
        </Nav>
        <Nav className="ml-auto pr-md-5">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 200 }}
            overlay={<Tooltip id="t-github">Github</Tooltip>}
          >
            <StyledNavLink
              href="https://github.com/chrisfactory/react-meta-state"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
              <span className="sr-only">Github</span>
            </StyledNavLink>
          </OverlayTrigger>
        </Nav>
      </StyledNavbar>
    </>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
