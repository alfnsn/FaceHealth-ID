import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import ast
import os
from collections import Counter
import warnings
warnings.filterwarnings('ignore')

# PAGE CONFIG
st.set_page_config(
    page_title="Skincare Acne Intelligence",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="expanded",
    menu_items=None
)

# CUSTOM CSS — diperbaiki: tidak ada wildcard yang bocor ke main area
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    html, body, [class*="css"] {
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #1e2d3d;
    }
    .stApp { background: #f0f7ff; color: #1e2d3d; }

    /* Override global dark theme input background */
    .stApp input, .stApp select, .stApp textarea {
        background-color: #ffffff !important;
        color: #1e2d3d !important;
    }

    /* ── SIDEBAR: hanya elemen spesifik, bukan wildcard * ── */
    section[data-testid="stSidebar"] {
        background: linear-gradient(160deg, #0f4c75 0%, #1b6ca8 100%) !important;
        border-right: none;
    }

    /* Teks umum di sidebar */
    section[data-testid="stSidebar"] p,
    section[data-testid="stSidebar"] span,
    section[data-testid="stSidebar"] div,
    section[data-testid="stSidebar"] li,
    section[data-testid="stSidebar"] small,
    section[data-testid="stSidebar"] .stCaption,
    section[data-testid="stSidebar"] [data-testid="stMarkdownContainer"] p {
        color: #cde8ff !important;
    }

    section[data-testid="stSidebar"] h3 {
        color: #ffffff !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        letter-spacing: -0.01em !important;
    }

    section[data-testid="stSidebar"] .stSelectbox label,
    section[data-testid="stSidebar"] .stMultiSelect label,
    section[data-testid="stSidebar"] .stRadio label,
    section[data-testid="stSidebar"] .stRadio p {
        color: #90c8f0 !important;
        font-size: 10px !important;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 700;
    }

    /* Pilihan dropdown di sidebar */
    section[data-testid="stSidebar"] [data-baseweb="tag"] span,
    section[data-testid="stSidebar"] [data-baseweb="tag"],
    section[data-testid="stSidebar"] [data-baseweb="select"] span,
    section[data-testid="stSidebar"] [data-baseweb="menu"] li {
        color: #1e2d3d !important;
    }

    /* Radio button label di sidebar */
    section[data-testid="stSidebar"] [data-baseweb="radio"] label span:last-child {
        color: #cde8ff !important;
    }

    /* ── MAIN AREA: semua teks wajib gelap ── */
    .main, .block-container {
        color: #1e2d3d !important;
    }

    .block-container p,
    .block-container span,
    .block-container div,
    .block-container label,
    .block-container h1,
    .block-container h2,
    .block-container h3,
    .block-container h4,
    .block-container h5 {
        color: #1e2d3d !important;
    }

    /* Label widget di main */
    .main .stSelectbox label,
    .main .stMultiSelect label,
    .main .stRadio label,
    .main .stRadio p,
    .block-container .stSelectbox label,
    .block-container .stMultiSelect label,
    .block-container .stRadio label,
    .block-container .stRadio p {
        color: #1e2d3d !important;
        font-size: 13px !important;
        text-transform: none !important;
        letter-spacing: normal !important;
        font-weight: 600 !important;
    }

    /* ── DROPDOWN / SELECTBOX — paksa background putih & teks gelap di main area ── */

    /* Container utama select box */
    .block-container [data-baseweb="select"] > div,
    .block-container [data-baseweb="select"] > div:hover,
    .block-container [data-baseweb="select"] > div:focus-within {
        background-color: #ffffff !important;
        border-color: #b8d9f0 !important;
        color: #1e2d3d !important;
    }

    /* Teks di dalam kotak select */
    .block-container [data-baseweb="select"] span,
    .block-container [data-baseweb="select"] div,
    .block-container [data-baseweb="select"] input,
    .block-container [data-baseweb="select"] [data-testid="stSelectbox"],
    .block-container [data-baseweb="select"] > div > div,
    .block-container [data-baseweb="select"] > div > div > div {
        background-color: #ffffff !important;
        color: #1e2d3d !important;
    }

    /* Ikon dropdown arrow */
    .block-container [data-baseweb="select"] svg {
        fill: #1b6ca8 !important;
    }

    /* Dropdown menu list (popup pilihan) */
    [data-baseweb="popover"] [role="listbox"],
    [data-baseweb="menu"],
    [data-baseweb="popover"] ul {
        background-color: #ffffff !important;
        border: 1px solid #b8d9f0 !important;
        border-radius: 10px !important;
    }

    /* Setiap item di dalam menu */
    [data-baseweb="menu"] li,
    [data-baseweb="menu"] [role="option"],
    [data-baseweb="popover"] li {
        background-color: #ffffff !important;
        color: #1e2d3d !important;
    }

    /* Item yang di-hover */
    [data-baseweb="menu"] li:hover,
    [data-baseweb="menu"] [role="option"]:hover,
    [data-baseweb="popover"] li:hover {
        background-color: #eaf5ff !important;
        color: #0f4c75 !important;
    }

    /* Item yang dipilih / aktif */
    [data-baseweb="menu"] li[aria-selected="true"],
    [data-baseweb="menu"] [role="option"][aria-selected="true"] {
        background-color: #dbeeff !important;
        color: #0f4c75 !important;
        font-weight: 600 !important;
    }

    /* Input text di dalam select (search/filter) */
    .block-container input[type="text"],
    .block-container input[type="search"],
    .block-container [data-baseweb="input"] input {
        background-color: #ffffff !important;
        color: #1e2d3d !important;
        border-color: #b8d9f0 !important;
    }

    /* Radio button text di main */
    .block-container [data-baseweb="radio"] label span:last-child {
        color: #1e2d3d !important;
    }

    /* Radio button circle warna */
    .block-container [data-baseweb="radio"] [role="radio"] {
        border-color: #1b6ca8 !important;
    }

    /* Expander */
    .block-container .streamlit-expanderHeader,
    .block-container .streamlit-expanderHeader p,
    .block-container [data-testid="stExpander"] summary,
    .block-container [data-testid="stExpander"] summary p {
        color: #1e2d3d !important;
        font-weight: 600;
    }
    .block-container [data-testid="stExpander"] {
        background-color: #f8fbff !important;
        border: 1px solid #d6eaf8 !important;
        border-radius: 10px !important;
    }

    /* Warning / error / info boxes */
    .stAlert p { color: #1e2d3d !important; }

    /* Dataframe teks */
    .stDataFrame, .stDataFrame * { color: #1e2d3d !important; }

    /* Tab teks */
    .stTabs [data-baseweb="tab-list"] {
        background: white;
        border-radius: 14px;
        padding: 4px;
        border: 1px solid #d6eaf8;
        gap: 2px;
    }
    .stTabs [data-baseweb="tab"] {
        color: #1b6ca8 !important;
        font-size: 12px;
        font-weight: 600;
        border-radius: 10px;
        padding: 8px 18px;
    }
    .stTabs [aria-selected="true"] {
        background: linear-gradient(135deg, #1b6ca8, #2389d4) !important;
        color: white !important;
    }

    /* ── KPI CARDS ── */
    .kpi-card {
        background: white;
        border-radius: 18px;
        padding: 22px 26px;
        border: 1px solid #d6eaf8;
        box-shadow: 0 2px 18px rgba(15, 76, 117, 0.08);
        position: relative;
        overflow: hidden;
    }
    .kpi-card::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 4px;
        background: var(--bar, linear-gradient(90deg,#1b6ca8,#56b4e9));
    }
    .kpi-label {
        font-size: 10px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.14em;
        color: #6aaed6; margin-bottom: 6px;
    }
    .kpi-value {
        font-size: 32px; font-weight: 800;
        color: #0f4c75; line-height: 1;
        font-family: 'JetBrains Mono', monospace;
    }
    .kpi-sub { font-size: 12px; color: #5a8aa8; margin-top: 6px; font-weight: 500; }

    /* ── SECTION HEADER ── */
    .sec-head {
        font-size: 11px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.16em;
        color: #1b6ca8; margin: 28px 0 12px 0;
        display: flex; align-items: center; gap: 10px;
    }
    .sec-head::after {
        content: ''; flex: 1; height: 1px;
        background: linear-gradient(90deg, #b8d9f0, transparent);
    }

    /* ── INSIGHT BOX ── */
    .insight-box {
        background: linear-gradient(135deg, #eaf5ff, #f0fbff);
        border-radius: 16px; padding: 18px 22px;
        border: 1px solid #c2e0f4;
        border-left: 5px solid #1b6ca8;
        margin-bottom: 12px;
    }
    .insight-title { font-size: 12px; font-weight: 700; color: #0f4c75; margin-bottom: 5px; }
    .insight-body { font-size: 13px; color: #1e2d3d; line-height: 1.7; font-weight: 400; }

    /* ── PILL ── */
    .pill {
        display: inline-block; padding: 5px 16px; border-radius: 20px;
        font-size: 12px; font-weight: 600;
        background: linear-gradient(135deg, #1b6ca8, #56b4e9);
        color: white; margin: 3px;
        box-shadow: 0 2px 8px rgba(27, 108, 168, 0.25);
    }

    /* ── DASHBOARD TITLE ── */
    .dash-title {
        font-size: 30px; font-weight: 800;
        background: linear-gradient(135deg, #0f4c75 0%, #56b4e9 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        letter-spacing: -0.03em; line-height: 1.1;
    }
    .dash-sub { font-size: 13px; color: #2c7aaa; margin-top: 4px; font-weight: 500; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #f0f7ff; }
    ::-webkit-scrollbar-thumb { background: #b8d9f0; border-radius: 3px; }
    .block-container { padding-top: 24px !important; }
    div[data-testid="stHorizontalBlock"] { gap: 12px; }
</style>
""", unsafe_allow_html=True)

# LOAD DATA
@st.cache_data
def load_data():
    import os
    df = pd.read_csv(os.path.join(os.path.dirname(__file__), "skincare_clean.csv"))
    def parse_ing(x):
        try:
            return ast.literal_eval(x)
        except:
            return []
    df['ing_list'] = df['Ingredients_List'].apply(parse_ing)
    return df

df = load_data()

# ── PLOTLY LAYOUT DEFAULT (teks selalu gelap) ──
DARK = '#1e2d3d'
GRID = '#d6eaf8'

PLOT_LAYOUT = dict(
    plot_bgcolor='rgba(0,0,0,0)',
    paper_bgcolor='rgba(0,0,0,0)',
    font=dict(color=DARK, family='Plus Jakarta Sans', size=12),
)

AXIS_STYLE = dict(
    tickfont=dict(color=DARK, size=12),
    title_font=dict(color=DARK, size=12),
    gridcolor=GRID,
)

LEGEND_STYLE = dict(bgcolor='rgba(0,0,0,0)', font=dict(color=DARK, size=12))

def style_fig(fig, height=300, margin=None, showlegend=True):
    """Apply consistent dark-text styling to any Plotly figure."""
    m = margin or dict(l=10, r=20, t=20, b=10)
    fig.update_layout(
        **PLOT_LAYOUT,
        height=height,
        margin=m,
        legend=LEGEND_STYLE if showlegend else dict(visible=False),
    )
    fig.update_xaxes(**AXIS_STYLE)
    fig.update_yaxes(**AXIS_STYLE)
    return fig

# SIDEBAR
with st.sidebar:
    st.markdown("### **Skincare AI Dashboard**")
    st.markdown("---")

    st.markdown("### AGE GROUP")
    age_opts = sorted(df['Age_Group'].unique())
    age_sel = st.multiselect("", age_opts, default=age_opts, key="age")

    st.markdown("### SKIN TYPE")
    skin_opts = sorted(df['Skin_Type'].unique())
    skin_sel = st.multiselect("", skin_opts, default=skin_opts, key="skin")

    st.markdown("### ACNE TYPE")
    acne_opts = sorted(df['Internal_Type'].unique())
    acne_sel = st.multiselect("", acne_opts, default=acne_opts, key="acne")

    st.markdown("### SENSITIVITY")
    sens_sel = st.radio("", ["All", "Sensitive", "Non-Sensitive"], horizontal=False)

    st.markdown("---")
    st.caption("Data: 240 Skincare Profiles")
    st.caption("Focus: Acne Treatment Formulation")
    st.caption("Built with Streamlit + Plotly")

# FILTER
flt = df[
    df['Age_Group'].isin(age_sel) &
    df['Skin_Type'].isin(skin_sel) &
    df['Internal_Type'].isin(acne_sel)
]
if sens_sel == "Sensitive":
    flt = flt[flt['Sensitivity'] == 'Yes']
elif sens_sel == "Non-Sensitive":
    flt = flt[flt['Sensitivity'] == 'No']

# HEADER
st.markdown('<div class="dash-title">Skincare Acne Intelligence</div>', unsafe_allow_html=True)
st.markdown(f'<div class="dash-sub">Analisis Formulasi Bahan Aktif untuk Perawatan Acne &mdash; {len(flt):,} dari {len(df):,} profil</div>', unsafe_allow_html=True)

if len(flt) == 0:
    st.error("Tidak ada data untuk filter yang dipilih. Silakan perlebar filter.")
    st.stop()

# KPI
st.markdown('<div class="sec-head">RINGKASAN DATA</div>', unsafe_allow_html=True)

all_ings = flt['ing_list'].explode()
top_ing = all_ings.value_counts().idxmax() if len(all_ings) > 0 else "-"
n_sensitive = flt[flt['Sensitivity'] == 'Yes'].shape[0]
pct_sens = int(n_sensitive / len(flt) * 100) if len(flt) > 0 else 0
n_unique_formulas = flt['Ingredients'].nunique()

k1, k2, k3, k4, k5 = st.columns(5)

def kpi(label, value, sub, bar="#7c3aed"):
    return f"""<div class='kpi-card' style='--bar:{bar}'>
        <div class='kpi-label'>{label}</div>
        <div class='kpi-value'>{value}</div>
        <div class='kpi-sub'>{sub}</div>
    </div>"""

with k1:
    st.markdown(kpi("Total Profil", f"{len(flt)}", "skin profiles", "linear-gradient(90deg,#1b6ca8,#56b4e9)"), unsafe_allow_html=True)
with k2:
    st.markdown(kpi("Formula Unik", f"{n_unique_formulas}", "kombinasi bahan", "linear-gradient(90deg,#0ea5e9,#38bdf8)"), unsafe_allow_html=True)
with k3:
    st.markdown(kpi("Tipe Kulit", f"{flt['Skin_Type'].nunique()}", "tipe berbeda", "linear-gradient(90deg,#0891b2,#22d3ee)"), unsafe_allow_html=True)
with k4:
    st.markdown(kpi("Kulit Sensitif", f"{pct_sens}%", f"{n_sensitive} dari {len(flt)} profil", "linear-gradient(90deg,#e85d75,#f4a6b3)"), unsafe_allow_html=True)
with k5:
    st.markdown(kpi("Bahan Terpopuler", top_ing.split()[0] if top_ing != "-" else "-", top_ing if top_ing != "-" else "-", "linear-gradient(90deg,#1b6ca8,#56b4e9)"), unsafe_allow_html=True)

# TABS
t1, t2, t3, t4, t5 = st.tabs([
    "Bahan Aktif", "Profil Kulit", "Demografi & Usia",
    "Eksplorasi Data", "Insight & Kesimpulan"
])

# TAB 1: BAHAN AKTIF
with t1:
    c1, c2 = st.columns([1, 1])

    with c1:
        st.markdown('<div class="sec-head">FREKUENSI BAHAN AKTIF</div>', unsafe_allow_html=True)
        ing_counts = all_ings.value_counts().reset_index()
        ing_counts.columns = ['Ingredient', 'Count']
        ing_counts['Pct'] = (ing_counts['Count'] / len(flt) * 100).round(1)
        fig = px.bar(ing_counts, x='Count', y='Ingredient', orientation='h',
                     color='Count', color_continuous_scale='Blues',
                     text=ing_counts['Pct'].apply(lambda x: f"{x}%"))
        style_fig(fig, height=320, margin=dict(l=160, r=70, t=10, b=10), showlegend=False)
        fig.update_layout(coloraxis_showscale=False,
                          yaxis=dict(categoryorder='total ascending', tickfont=dict(color=DARK, size=12)))
        fig.update_traces(textposition='outside', marker_line_width=0,
                          textfont=dict(color=DARK, size=12))
        fig.update_xaxes(showgrid=True, gridcolor=GRID, tickfont=dict(color=DARK, size=11),
                         title_text='Count', title_font=dict(color=DARK))
        fig.update_yaxes(showgrid=False)
        st.plotly_chart(fig, use_container_width=True)

    with c2:
        st.markdown('<div class="sec-head">PROPORSI BAHAN</div>', unsafe_allow_html=True)
        fig_pie = px.pie(ing_counts, names='Ingredient', values='Count',
                         color_discrete_sequence=['#0f4c75','#1b6ca8','#2389d4','#0891b2','#0ea5e9','#38bdf8'],
                         hole=0.5)
        fig_pie.update_layout(**PLOT_LAYOUT,
                               legend=dict(bgcolor='rgba(0,0,0,0)', font=dict(color=DARK, size=11)),
                               margin=dict(l=10, r=10, t=40, b=40), height=320)
        fig_pie.update_traces(
            textinfo='percent+label',
            textposition='outside',
            textfont=dict(color=DARK, size=11),
            pull=[0.03]*len(ing_counts),
        )
        st.plotly_chart(fig_pie, use_container_width=True)

    st.markdown('<div class="sec-head">BAHAN AKTIF x TIPE JERAWAT</div>', unsafe_allow_html=True)
    rows = []
    for _, row in flt.iterrows():
        for ing in row['ing_list']:
            rows.append({'Acne_Type': row['Internal_Type'], 'Ingredient': ing})
    ing_acne = pd.DataFrame(rows)
    if len(ing_acne) > 0:
        pivot = ing_acne.groupby(['Ingredient', 'Acne_Type']).size().unstack(fill_value=0)
        fig_heat = px.imshow(pivot, color_continuous_scale='Blues',
                             labels=dict(x='Tipe Jerawat', y='Bahan Aktif', color='Frekuensi'),
                             aspect='auto', text_auto=True)
        # Use white text on dark cells, dark text on light cells via annotation color
        fig_heat.update_traces(textfont=dict(color='white', size=13))
        style_fig(fig_heat, height=310, margin=dict(l=160, r=20, t=10, b=10))
        fig_heat.update_xaxes(tickfont=dict(color=DARK, size=12), title_font=dict(color=DARK))
        fig_heat.update_yaxes(tickfont=dict(color=DARK, size=12), title_font=dict(color=DARK))
        st.plotly_chart(fig_heat, use_container_width=True)

    st.markdown('<div class="sec-head">BAHAN AKTIF x TIPE KULIT</div>', unsafe_allow_html=True)
    rows2 = []
    for _, row in flt.iterrows():
        for ing in row['ing_list']:
            rows2.append({'Skin_Type': row['Skin_Type'], 'Ingredient': ing})
    ing_skin = pd.DataFrame(rows2)
    if len(ing_skin) > 0:
        pivot2 = ing_skin.groupby(['Ingredient', 'Skin_Type']).size().unstack(fill_value=0)
        fig_h2 = px.imshow(pivot2, color_continuous_scale='GnBu',
                           labels=dict(x='Tipe Kulit', y='Bahan Aktif', color='Frekuensi'),
                           aspect='auto', text_auto=True)
        fig_h2.update_traces(textfont=dict(color='white', size=13))
        style_fig(fig_h2, height=310, margin=dict(l=160, r=20, t=10, b=10))
        fig_h2.update_xaxes(tickfont=dict(color=DARK, size=12), title_font=dict(color=DARK))
        fig_h2.update_yaxes(tickfont=dict(color=DARK, size=12), title_font=dict(color=DARK))
        st.plotly_chart(fig_h2, use_container_width=True)

# TAB 2: PROFIL KULIT
with t2:
    c1, c2 = st.columns(2)

    with c1:
        st.markdown('<div class="sec-head">DISTRIBUSI TIPE KULIT</div>', unsafe_allow_html=True)
        skin_dist = flt['Skin_Type'].value_counts().reset_index()
        skin_dist.columns = ['Skin_Type', 'Count']
        colors = ['#1b6ca8', '#2389d4', '#56b4e9', '#90caf9']
        fig_sk = px.bar(skin_dist, x='Skin_Type', y='Count',
                        color='Skin_Type', color_discrete_sequence=colors, text='Count')
        style_fig(fig_sk, height=280, margin=dict(l=10, r=10, t=10, b=10), showlegend=False)
        fig_sk.update_traces(textposition='outside', marker_line_width=0,
                             textfont=dict(color=DARK, size=12))
        st.plotly_chart(fig_sk, use_container_width=True)

    with c2:
        st.markdown('<div class="sec-head">DISTRIBUSI TIPE JERAWAT</div>', unsafe_allow_html=True)
        acne_dist = flt['Internal_Type'].value_counts().reset_index()
        acne_dist.columns = ['Acne_Type', 'Count']
        fig_ac = px.pie(acne_dist, names='Acne_Type', values='Count',
                        color_discrete_sequence=['#1b6ca8', '#0ea5e9', '#38bdf8'], hole=0.45)
        fig_ac.update_layout(**PLOT_LAYOUT,
                              legend=dict(bgcolor='rgba(0,0,0,0)', font=dict(color=DARK)),
                              margin=dict(l=10, r=10, t=30, b=30), height=280)
        fig_ac.update_traces(textinfo='percent+label', textfont=dict(color=DARK, size=11))
        st.plotly_chart(fig_ac, use_container_width=True)

    st.markdown('<div class="sec-head">MATRIX: TIPE KULIT x TIPE JERAWAT</div>', unsafe_allow_html=True)
    cross = pd.crosstab(flt['Skin_Type'], flt['Internal_Type'])
    fig_m = px.imshow(cross, color_continuous_scale='Blues',
                      labels=dict(x='Tipe Jerawat', y='Tipe Kulit', color='Jumlah'),
                      text_auto=True, aspect='auto')
    fig_m.update_traces(textfont=dict(color='white', size=13))
    style_fig(fig_m, height=300, margin=dict(l=130, r=20, t=10, b=10))
    fig_m.update_xaxes(tickfont=dict(color=DARK), title_font=dict(color=DARK))
    fig_m.update_yaxes(tickfont=dict(color=DARK), title_font=dict(color=DARK))
    st.plotly_chart(fig_m, use_container_width=True)

    c3, c4 = st.columns(2)
    with c3:
        st.markdown('<div class="sec-head">SENSITIVITAS x TIPE KULIT</div>', unsafe_allow_html=True)
        sens_skin = pd.crosstab(flt['Skin_Type'], flt['Sensitivity'])
        sens_skin_melt = sens_skin.reset_index().melt(id_vars='Skin_Type', var_name='Sensitivity', value_name='Count')
        fig_ss = px.bar(sens_skin_melt, x='Skin_Type', y='Count', color='Sensitivity',
                        barmode='group', color_discrete_map={'Yes': '#e85d75', 'No': '#1b9e77'})
        style_fig(fig_ss, height=260, margin=dict(l=10, r=10, t=10, b=10))
        st.plotly_chart(fig_ss, use_container_width=True)

    with c4:
        st.markdown('<div class="sec-head">SKIN SUBTYPE DISTRIBUTION</div>', unsafe_allow_html=True)
        sub_dist = flt['Skin_Subtype'].value_counts().reset_index()
        sub_dist.columns = ['Subtype', 'Count']
        fig_sub = px.bar(sub_dist, x='Count', y='Subtype', orientation='h',
                         color='Count', color_continuous_scale='Blues')
        style_fig(fig_sub, height=260, margin=dict(l=160, r=20, t=10, b=10), showlegend=False)
        fig_sub.update_layout(coloraxis_showscale=False,
                               yaxis=dict(categoryorder='total ascending', tickfont=dict(color=DARK, size=11)))
        st.plotly_chart(fig_sub, use_container_width=True)

# TAB 3: DEMOGRAFI
with t3:
    c1, c2 = st.columns(2)

    with c1:
        st.markdown('<div class="sec-head">DISTRIBUSI KELOMPOK USIA</div>', unsafe_allow_html=True)
        age_dist = flt['Age_Group'].value_counts().sort_index().reset_index()
        age_dist.columns = ['Age_Group', 'Count']
        fig_age = px.bar(age_dist, x='Age_Group', y='Count',
                         color='Count', color_continuous_scale='Blues', text='Count')
        style_fig(fig_age, height=280, margin=dict(l=10, r=10, t=10, b=10), showlegend=False)
        fig_age.update_layout(coloraxis_showscale=False)
        fig_age.update_traces(textposition='outside', marker_line_width=0,
                              textfont=dict(color=DARK, size=12))
        st.plotly_chart(fig_age, use_container_width=True)

    with c2:
        st.markdown('<div class="sec-head">TIPE JERAWAT PER USIA</div>', unsafe_allow_html=True)
        age_acne = pd.crosstab(flt['Age_Group'], flt['Internal_Type'])
        age_acne_melt = age_acne.reset_index().melt(id_vars='Age_Group', var_name='Acne_Type', value_name='Count')
        fig_aa = px.bar(age_acne_melt, x='Age_Group', y='Count', color='Acne_Type',
                        barmode='stack',
                        color_discrete_map={'Comedonal': '#1b6ca8', 'Inflammatory': '#0ea5e9', 'Cyst': '#38bdf8'})
        style_fig(fig_aa, height=280, margin=dict(l=10, r=10, t=10, b=10))
        st.plotly_chart(fig_aa, use_container_width=True)

    st.markdown('<div class="sec-head">TIPE KULIT PER USIA</div>', unsafe_allow_html=True)
    age_skin = pd.crosstab(flt['Age_Group'], flt['Skin_Type'])
    age_skin_melt = age_skin.reset_index().melt(id_vars='Age_Group', var_name='Skin_Type', value_name='Count')
    fig_as = px.line(age_skin_melt, x='Age_Group', y='Count', color='Skin_Type',
                     markers=True,
                     color_discrete_sequence=['#1b6ca8', '#0ea5e9', '#0891b2', '#38bdf8'])
    style_fig(fig_as, height=280, margin=dict(l=10, r=10, t=10, b=10))
    fig_as.update_traces(line_width=2.5, marker_size=8)
    fig_as.update_xaxes(showgrid=False)
    fig_as.update_yaxes(showgrid=True, gridcolor=GRID)
    st.plotly_chart(fig_as, use_container_width=True)

    c3, c4 = st.columns(2)
    with c3:
        st.markdown('<div class="sec-head">SENSITIVITAS PER USIA</div>', unsafe_allow_html=True)
        age_sens = pd.crosstab(flt['Age_Group'], flt['Sensitivity'], normalize='index') * 100
        age_sens_melt = age_sens.reset_index().melt(id_vars='Age_Group', var_name='Sensitivity', value_name='Pct')
        fig_agesens = px.bar(age_sens_melt, x='Age_Group', y='Pct', color='Sensitivity',
                             barmode='stack',
                             color_discrete_map={'Yes': '#e85d75', 'No': '#1b9e77'},
                             labels={'Pct': '%'})
        style_fig(fig_agesens, height=260, margin=dict(l=10, r=10, t=10, b=10))
        st.plotly_chart(fig_agesens, use_container_width=True)

    with c4:
        st.markdown('<div class="sec-head">SUNBURST: USIA / KULIT / JERAWAT</div>', unsafe_allow_html=True)
        sun = flt.groupby(['Age_Group', 'Skin_Type', 'Internal_Type']).size().reset_index(name='Count')
        fig_sun = px.sunburst(sun, path=['Age_Group', 'Skin_Type', 'Internal_Type'],
                              values='Count', color_continuous_scale='Blues')
        fig_sun.update_layout(**PLOT_LAYOUT, margin=dict(l=10, r=10, t=10, b=10), height=260)
        st.plotly_chart(fig_sun, use_container_width=True)

# TAB 4: EKSPLORASI DATA
with t4:
    st.markdown('<div class="sec-head">EKSPLORASI INTERAKTIF</div>', unsafe_allow_html=True)

    col_filter, col_chart = st.columns([1, 2])
    with col_filter:
        x_var = st.selectbox("Sumbu X", ['Skin_Type', 'Age_Group', 'Internal_Type', 'Sensitivity', 'Skin_Subtype'], index=0)
        color_var = st.selectbox("Warna berdasarkan", ['Internal_Type', 'Skin_Type', 'Age_Group', 'Sensitivity'], index=0)
        chart_type = st.radio("Jenis Chart", ["Bar", "Treemap", "Sunburst"], horizontal=True)

    with col_chart:
        group = flt.groupby([x_var, color_var]).size().reset_index(name='Count')
        if chart_type == "Bar":
            fig_exp = px.bar(group, x=x_var, y='Count', color=color_var,
                             barmode='group', color_discrete_sequence=['#1b6ca8','#2389d4','#56b4e9','#38bdf8'])
            style_fig(fig_exp, height=340, margin=dict(l=10, r=10, t=10, b=10))
        elif chart_type == "Treemap":
            fig_exp = px.treemap(group, path=[x_var, color_var], values='Count',
                                 color='Count', color_continuous_scale='Blues')
            fig_exp.update_layout(**PLOT_LAYOUT, margin=dict(l=10, r=10, t=10, b=10), height=340)
            fig_exp.update_traces(textfont=dict(color=DARK, size=13))
        else:
            fig_exp = px.sunburst(group, path=[x_var, color_var], values='Count',
                                  color='Count', color_continuous_scale='Blues')
            fig_exp.update_layout(**PLOT_LAYOUT, margin=dict(l=10, r=10, t=10, b=10), height=340)
            fig_exp.update_traces(textfont=dict(color=DARK, size=13))
        st.plotly_chart(fig_exp, use_container_width=True)

    st.markdown('<div class="sec-head">CARI FORMULA BERDASARKAN PROFIL</div>', unsafe_allow_html=True)
    rc1, rc2, rc3, rc4 = st.columns(4)
    with rc1:
        sel_skin = st.selectbox("Tipe Kulit", sorted(df['Skin_Type'].unique()))
    with rc2:
        sel_acne = st.selectbox("Tipe Jerawat", sorted(df['Internal_Type'].unique()))
    with rc3:
        sel_age = st.selectbox("Usia", sorted(df['Age_Group'].unique()))
    with rc4:
        sel_sens = st.selectbox("Sensitif?", ['Yes', 'No'])

    result = df[
        (df['Skin_Type'] == sel_skin) &
        (df['Internal_Type'] == sel_acne) &
        (df['Age_Group'] == sel_age) &
        (df['Sensitivity'] == sel_sens)
    ]

    if len(result) > 0:
        rec_ings = result['ing_list'].explode().value_counts()
        st.markdown(f"**Ditemukan {len(result)} formula cocok untuk profil ini:**")
        cols_pills = st.columns(len(rec_ings))
        for i, (ing, cnt) in enumerate(rec_ings.items()):
            with cols_pills[i]:
                st.markdown(f"<div class='pill'>{ing}</div>", unsafe_allow_html=True)
        with st.expander("Lihat detail formula", expanded=False):
            show_cols = ['Ingredients', 'Concentrations', 'Effects', 'Skin_Profile']
            st.dataframe(result[show_cols].reset_index(drop=True), use_container_width=True)
    else:
        st.warning("Tidak ada formula yang cocok untuk kombinasi ini.")

# TAB 5: INSIGHT
with t5:
    st.markdown('<div class="sec-head">INSIGHT UTAMA DARI EDA</div>', unsafe_allow_html=True)

    insights = [
        ("Bahan Paling Dominan",
         f"Dari {len(flt)} profil yang dianalisis, <b>Salicylic Acid</b> dan <b>Benzoyl Peroxide</b> adalah dua bahan aktif yang paling sering direkomendasikan. Keduanya muncul di lebih dari 50% formula, mencerminkan efektivitasnya untuk mengatasi jerawat secara luas."),
        ("Distribusi Tipe Kulit Merata",
         "Dataset ini memiliki distribusi yang sangat seimbang: masing-masing 60 profil untuk setiap tipe kulit (Normal, Dry, Oily, Combination). Ini memastikan rekomendasi yang fair dan tidak bias terhadap satu tipe kulit tertentu."),
        ("Tipe Jerawat Terdistribusi Merata",
         "Tipe jerawat <b>Comedonal, Inflammatory, dan Cyst</b> masing-masing memiliki 80 formula berbeda. Bahan aktif seperti Zinc PCA dan Niacinamide lebih sering muncul pada formulasi kulit sensitif karena sifatnya yang lebih lembut."),
        ("50% Pengguna Memiliki Kulit Sensitif",
         "Tepat 50% profil dikategorikan sebagai <b>kulit sensitif</b>. Ini menunjukkan bahwa formulasi skincare acne perlu mempertimbangkan sensitivitas sebagai faktor penting, tidak hanya jenis kulit atau tipe jerawat."),
        ("Rentang Usia Terwakili Merata",
         "Setiap kelompok usia (14-18, 19-24, 25-36, 37-45, 45+) memiliki 48 profil. Usia remaja cenderung lebih banyak mengalami jerawat Inflammatory, sementara usia dewasa (37+) lebih sering menunjukkan profil Comedonal."),
        ("6 Bahan Aktif Utama Mendominasi",
         "Seluruh dataset hanya menggunakan <b>6 bahan aktif inti</b>: Salicylic Acid, Benzoyl Peroxide, Zinc PCA, Niacinamide, Green Tea Extract, dan Azelaic Acid. Dengan kombinasi berbeda, keenam bahan ini menghasilkan 101 formula unik."),
    ]

    c1, c2 = st.columns(2)
    for i, (title, body) in enumerate(insights):
        target = c1 if i % 2 == 0 else c2
        with target:
            st.markdown(f"""
            <div class='insight-box'>
                <div class='insight-title'>{title}</div>
                <div class='insight-body'>{body}</div>
            </div>""", unsafe_allow_html=True)

    st.markdown('<div class="sec-head">KESIMPULAN & REKOMENDASI</div>', unsafe_allow_html=True)
    st.markdown("""
    <div style="background:linear-gradient(135deg,#eaf5ff,#dbeeff);border-radius:20px;padding:28px 32px;border:1px solid #b8d9f0;">
        <div style="font-size:16px;font-weight:800;margin-bottom:16px;color:#0f4c75;">Kesimpulan Utama</div>
        <div style="font-size:13px;line-height:2.2;color:#1e2d3d;">
            &#8212;&nbsp; Dataset mencakup <b style="color:#0f4c75">240 profil kulit</b> dengan <b style="color:#0f4c75">101 kombinasi formula unik</b> untuk perawatan jerawat<br>
            &#8212;&nbsp; Enam bahan aktif inti cukup untuk <b style="color:#0f4c75">mencakup semua kombinasi</b> tipe kulit, usia, dan sensitivitas<br>
            &#8212;&nbsp; <b style="color:#0f4c75">Salicylic Acid</b> adalah bahan paling serbaguna, muncul di hampir semua tipe kulit dan jerawat<br>
            &#8212;&nbsp; Kulit sensitif memerlukan pendekatan berbeda: <b style="color:#0f4c75">Niacinamide dan Green Tea Extract</b> lebih diutamakan<br>
            &#8212;&nbsp; Formulasi ideal <b style="color:#0f4c75">selalu mengkombinasikan 3 bahan</b> untuk efek sinergis (antibakteri + anti-inflamasi + regulasi sebum)<br>
            &#8212;&nbsp; Dashboard ini dapat digunakan sebagai <b style="color:#0f4c75">sistem rekomendasi awal</b> sebelum konsultasi dokter kulit
        </div>
    </div>
    """, unsafe_allow_html=True)
