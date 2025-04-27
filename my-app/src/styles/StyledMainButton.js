import styled from 'styled-components'

const StyledMainButton = styled.button`
  display: inline-block;
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  @media (min-width: 768px) {
    margin-right: var(--spacing-sm);
  }

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
  
  &.login__button {
    background-color: var(--green);
    color: var(--white);
    border: 2px solid var(--green);
  }

  &.demo__button {
    color: var(--green);
    border: 2px solid var(--green);
    border-radius: var(--border-radius-pill);
    
    &:hover,
    &:focus {
      text-decoration: none;
      color: var(--black);
      background-color: var(--white);
      border-color: transparent;
      filter: brightness(1.1);
    }
  }
`
export default StyledMainButton