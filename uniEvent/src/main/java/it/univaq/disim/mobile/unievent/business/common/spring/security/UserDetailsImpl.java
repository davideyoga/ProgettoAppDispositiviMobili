package it.univaq.disim.mobile.unievent.business.common.spring.security;


import com.fasterxml.jackson.annotation.JsonIgnore;
import it.univaq.disim.mobile.unievent.business.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@SuppressWarnings("serial")
public class UserDetailsImpl implements UserDetails {

	private User utente;

	public UserDetailsImpl(User utente) {
		this.utente = utente;
	}

	@Override
	public String getUsername() {
		return utente.getSurname();
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return utente.getPassword();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return null;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public User getUtente() {
		return utente;
	}

}